import { useEffect, useState } from 'react'

const VERSION = '14.22.1'
const LANGUAGE = 'es_MX'
const CHAMPS_DATA = `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/${LANGUAGE}/champion.json`

function useGetChamps() {
    const [champs, setChamps] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedChamp, setSelectedChamp] = useState(null)
    const [isLoadingChamp, setIsLoadingChamp] = useState(false)

    useEffect(() => {
        const fetchChamps = async () => {
            try {
                setIsLoading(true)
                const response = await fetch(CHAMPS_DATA)
                const data = await response.json()

                if (response.status !== 200) {
                    throw new Error('Failed to fetch champion data')
                }

                const mappedChamps = mapChamps(Object.values(data.data))
                setChamps(mappedChamps)

                console.log(`Champ data:`, data)
                console.log(`Champ URL:`, CHAMPS_DATA)
            } catch (error) {
                console.error('Error fetching champion data:', error)
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchChamps()
    }, [])

    const fetchChampDetails = async (champId) => {
        const champUrl = `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/${LANGUAGE}/champion/${champId}.json`
        try {
            setIsLoadingChamp(true)
            const response = await fetch(champUrl)
            const data = await response.json()
            setSelectedChamp(data.data[champId])
            console.log(`Champ data on modal:`, data)
            console.log(`Champ URL  on modal:`, champUrl)
        } catch (error) {
            console.error('Error fetching champion details:', error)
        } finally {
            setIsLoadingChamp(false)
        }
    }

    return { champs, isLoading, error, selectedChamp, isLoadingChamp, fetchChampDetails }
}

function mapChamps(champsData) {
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
        avatarImage: `https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/${champ.id}.png`
    }))
}

export default useGetChamps
