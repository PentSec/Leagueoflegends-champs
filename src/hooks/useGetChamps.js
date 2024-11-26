import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const generateVoiceUrl = (language, champKey) => {
    const languagePath = language === 'en_US' ? 'default' : language.toLowerCase()
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/${languagePath}/v1/champion-choose-vo/${champKey}.ogg`
}

const parseVersion = (version) => {
    if (!version) {
        console.warn(
            'parseVersion: La versión está indefinida o es nula. Se requiere una versión válida.'
        )
        return 'latest'
    }
    const versionParts = version.split('.')
    if (versionParts.length >= 2) {
        return `${versionParts[0]}.${versionParts[1]}`
    }
    console.warn(
        'parseVersion: La versión no tiene el formato esperado (X.Y.Z). Usando valor predeterminado.'
    )
    return version
}

const generateAssetsUrl = (language, champKey, version) => {
    const languagePath = language === 'en_US' ? 'default' : language.toLowerCase()
    const parsedVersion = parseVersion(version)
    return `https://raw.communitydragon.org/${parsedVersion}/plugins/rcp-be-lol-game-data/global/${languagePath}/v1/champions/${champKey}.json`
}

const spellCalculation = (chamName) => {
    const champName = chamName.toLowerCase()
    return `https://raw.communitydragon.org/latest/game/data/characters/${champName}/${champName}.bin.json`
}

function useGetChamps(language, version) {
    const CHAMPS_DATA = `https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`
    const [champs, setChamps] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedChamp, setSelectedChamp] = useState(null)
    const [isLoadingChamp, setIsLoadingChamp] = useState(false)
    const [selectedCompareChamp, setSelectedCompareChamp] = useState(null)

    useEffect(() => {
        if (!version || !language) {
            const errors = []
            if (!version) errors.push('🤬 Error: No version selected.')
            if (!language) errors.push('🤬 Error: No language selected.')

            errors.forEach((error) => toast(error))
            return
        }
        const fetchChamps = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(CHAMPS_DATA)
                const data = await response.json()
                if (response.status !== 200) {
                    throw new Error('Failed to fetch champion data')
                }

                const mappedChamps = mapChamps(Object.values(data.data), version)
                setChamps(mappedChamps)
            } catch (error) {
                console.error('Error fetching champion data:', error)
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchChamps()
    }, [language, version])

    const cache = useRef({})

    const fetchChampDetails = async (champId, champVersion = version) => {
        if (!champVersion || !language) {
            const errors = []
            if (!champVersion) errors.push('🤬 Error: No version selected.')
            if (!language) errors.push('🤬 Error: No language selected.')
            errors.forEach((error) => toast(error))
            return
        }

        const cacheKey = `${champId}-${language}-${champVersion}`

        if (cache.current[cacheKey]) {
            if (champVersion === version) {
                setSelectedChamp(cache.current[cacheKey])
            } else {
                setSelectedCompareChamp(cache.current[cacheKey])
            }

            return
        }

        const champUrl = `https://ddragon.leagueoflegends.com/cdn/${champVersion}/data/${language}/champion/${champId}.json`
        try {
            setIsLoadingChamp(true)
            const response = await fetch(champUrl)
            const data = await response.json()
            if (response.status !== 200) {
                throw new Error('Failed to fetch champion details')
            }
            if (response.status === 403) {
                setSelectedCompareChamp(null)
                toast.error(`Champion not available in version ${champVersion}.`)
                return
            }
            if (response.status === 404) {
                setSelectedCompareChamp(null)
                throw new Error('Champion not found in this version.')
            }

            const baseChamp = champs.find((champ) => champ.id === champId)

            const detailedChamp = {
                ...baseChamp,
                ...data.data[champId],
                voice: generateVoiceUrl(language, baseChamp?.key || data.data[champId].key),
                assets: await fetchChampAssets(
                    generateAssetsUrl(
                        language,
                        baseChamp?.key || data.data[champId].key,
                        champVersion
                    )
                ),
                spellCalc: await fetchSpellCalculation(spellCalculation(data.data[champId].name))
            }

            cache.current[cacheKey] = detailedChamp

            if (champVersion === version) {
                setSelectedChamp(detailedChamp)
            } else {
                setSelectedCompareChamp(detailedChamp)
            }
        } catch (error) {
            console.error('Error fetching champion details:', error)
            setSelectedCompareChamp(null)
        } finally {
            setIsLoadingChamp(false)
        }
    }

    const fetchChampAssets = async (assetsUrl) => {
        try {
            const response = await fetch(assetsUrl)
            const assetsData = await response.json()
            if (!response.ok) {
                throw new Error('Failed to fetch champion assets')
            }

            return mapAssets(assetsData)
        } catch (error) {
            console.error('Error fetching champion assets:', error)
            return null
        }
    }

    const fetchSpellCalculation = async (spellCalcUrl) => {
        try {
            const response = await fetch(spellCalcUrl)
            const spellCalcData = await response.json()
            if (!response.ok) {
                throw new Error('Failed to fetch spell calculation')
            }

            return spellCalcData
        } catch (error) {
            console.error('Error fetching spell calculation:', error)
            return null
        }
    }

    return {
        champs,
        isLoading,
        error,
        selectedChamp,
        isLoadingChamp,
        fetchChampDetails,
        selectedCompareChamp,
        setSelectedCompareChamp
    }
}

function mapChamps(champsData, version) {
    return champsData.map((champ) => ({
        id: champ.id,
        name: champ.name,
        title: champ.title,
        key: champ.key,
        roles: champ.tags,
        blurb: champ.blurb,
        partype: champ.partype,
        info: {
            attack: champ.info.attack,
            defense: champ.info.defense,
            magic: champ.info.magic,
            difficulty: champ.info.difficulty
        },
        image: {
            full: champ.image.full,
            sprite: champ.image.sprite,
            group: champ.image.group,
            x: champ.image.x,
            y: champ.image.y,
            w: champ.image.w,
            h: champ.image.h
        },
        stats: {
            hp: champ.stats.hp,
            hpperlevel: champ.stats.hpperlevel,
            mp: champ.stats.mp,
            mpperlevel: champ.stats.mpperlevel,
            movespeed: champ.stats.movespeed,
            armor: champ.stats.armor,
            armorperlevel: champ.stats.armorperlevel,
            spellblock: champ.stats.spellblock,
            spellblockperlevel: champ.stats.spellblockperlevel,
            attackrange: champ.stats.attackrange,
            hpregen: champ.stats.hpregen,
            hpregenperlevel: champ.stats.hpregenperlevel,
            mpregen: champ.stats.mpregen,
            mpregenperlevel: champ.stats.mpregenperlevel,
            crit: champ.stats.crit,
            critperlevel: champ.stats.critperlevel,
            attackdamage: champ.stats.attackdamage,
            attackdamageperlevel: champ.stats.attackdamageperlevel,
            attackspeed: champ.stats.attackspeed,
            attackspeedperlevel: champ.stats.attackspeedperlevel
        },
        loadingImage: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`,
        avatarImage: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`
    }))
}
1

function mapAssets(asset) {
    return {
        id: asset.id,
        name: asset.name,
        alias: asset.alias,
        banVoPath: asset.banVoPath,
        chooseVoPath: asset.chooseVoPath,
        passive: asset.passive
            ? {
                  name: asset.passive.name,
                  abilityVideoPath: asset.passive.abilityVideoPath,
                  dynamicDescription: asset.passive.dynamicDescription
              }
            : null,
        spells: asset.spells
            ? asset.spells.map((spell) => ({
                  spellKey: spell.spellKey,
                  name: spell.name,
                  abilityVideoPath: spell.abilityVideoPath,
                  dynamicDescription: spell.dynamicDescription
              }))
            : []
    }
}

export default useGetChamps
