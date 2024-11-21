import { Avatar, Modal, ModalBody, ModalContent, ModalFooter, Spinner } from '@nextui-org/react'
import ImageGallery from 'react-image-gallery'
import { buildPositionIndex, getChampionLanes, laneIcon } from '@/utils'
import { useMemo, useEffect, useState } from 'react'

function ChampInfo({
    selectedChamp = {},
    selectedCompareChamp = {},
    isLoadingChamp,
    onClose,
    lanesRates
}) {
    const c = selectedChamp
    const cc = selectedCompareChamp

    console.log('champ', c)
    console.log('champ compare', cc)

    if (!cc) {
        return <div>Loading champion data...</div>
    }

    if (!c) {
        return <div>Loading champion data...</div>
    }
    const [isModalFullyLoaded, setIsModalFullyLoaded] = useState(false)
    const positionIndex = useMemo(() => {
        return lanesRates ? buildPositionIndex(lanesRates) : {}
    }, [lanesRates])

    const lanes = getChampionLanes(c.key, positionIndex)
    console.log('champ', c)

    const voiceChamp = useMemo(() => {
        if (!c?.voice) return null
        const audio = new Audio(c.voice)
        audio.load()
        return audio
    }, [c?.voice])

    useEffect(() => {
        if (isModalFullyLoaded && voiceChamp) {
            voiceChamp.currentTime = 0
            voiceChamp
                .play()
                .catch((error) => console.error('Error al reproducir el audio:', error))
        }

        return () => {
            if (voiceChamp) {
                voiceChamp.pause()
                voiceChamp.currentTime = 0
            }
        }
    }, [isModalFullyLoaded, voiceChamp])

    useEffect(() => {
        if (!isLoadingChamp) {
            const timeout = setTimeout(() => {
                setIsModalFullyLoaded(true)
            }, 500)
            return () => clearTimeout(timeout)
        }
    }, [isLoadingChamp])

    const images =
        c?.skins?.map((skin) => ({
            original: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${c.id}_${skin.num}.jpg`,
            thumbnail: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${c.id}_${skin.num}.jpg`,
            description: skin.name,
            originalAlt: skin.name,
            thumbnailAlt: skin.name
        })) || []

    return (
        <Modal
            scrollBehavior="inside"
            backdrop="blur"
            size="full"
            isOpen={!!c}
            onClose={onClose}
            classNames={{
                body: 'py-6',
                base: 'bg-[#19172c] dark:bg-[#0d1117] text-[#a8b0d3]',
                header: 'border-b-[1px]',
                footer: 'border-t-[1px]',
                closeButton: 'hover:bg-white/5 active:bg-white/10'
            }}
        >
            <ModalContent className="max-w-[1920px]">
                {isLoadingChamp ? (
                    <Spinner color="white" />
                ) : (
                    c && (
                        <ModalBody>
                            <section className="relative flex flex-col items-center justify-center p-4">
                                <div className="absolute top-1 left-0 w-full h-full z-10 bg-gradient-to-r from-[#0d1117] from-15% via-[#0d1117]/30 via-40% to-slate-500/0 to-90% rounded-lg pointer-events-none" />

                                <ImageGallery
                                    items={images}
                                    autoPlay={true}
                                    thumbnailPosition="right"
                                    slideInterval={4500}
                                />

                                <div className="z-20 flex flex-col items-start justify-start gap-2 p-4 pointer-events-none lg:absolute left-40 text-start">
                                    <h1 className="font-extrabold text-white uppercase text-7xl font-beaufortBold">
                                        {c.name}
                                    </h1>
                                    <span className="text-4xl italic font-bold text-teal-400 uppercase font-beaufortBold">
                                        {c.title}
                                    </span>

                                    <div className="grid grid-cols-3 gap-4 mt-2 font-spiegel text-default-foreground">
                                        <p>{`${c.lore.split(' ').slice(0, 70).join(' ')}${
                                            c.lore.split(' ').length > 70 ? '...' : ''
                                        }`}</p>
                                    </div>
                                    <h2 className="font-semibold text-gray-200">Position</h2>
                                    <ul>
                                        {lanes.length > 0 ? (
                                            lanes.map(({ lane, rate }) => (
                                                <li key={lane}>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar
                                                                src={laneIcon[lane]}
                                                                alt={lane}
                                                                className="flex-shrink-0 w-6 h-6 bg-transparent text-tiny"
                                                            />

                                                            <span className="flex flex-col text-tiny">
                                                                {' '}
                                                                Pick Rate {(rate * 100).toFixed(2)}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <p>Dont have date for this champion</p>
                                        )}
                                    </ul>
                                </div>
                            </section>
                            <section className="flex flex-col items-center justify-center w-full p-4">
                                <h1 className="mb-4 text-2xl font-bold">
                                    Champion Abilities Comparison
                                </h1>
                                <div className="flex flex-col gap-4">
                                    {c.spells?.map((spell, index) => {
                                        const compareSpell = cc.spells?.[index]

                                        return (
                                            <div
                                                key={spell.id}
                                                className="flex flex-col items-start gap-4 p-4 bg-gray-800 border border-gray-700 rounded-lg"
                                            >
                                                {/* Nombre e imagen de la habilidad del primer campeón */}
                                                <div className="flex items-start gap-6">
                                                    <div className="flex flex-col items-center">
                                                        <img
                                                            src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/${spell.image.full}`}
                                                            alt={spell.name}
                                                            className="w-12 h-12"
                                                        />
                                                        <h2 className="text-xl font-bold text-teal-400">
                                                            {spell.name}
                                                        </h2>
                                                    </div>

                                                    {/* Comparación de habilidades */}
                                                    <div className="flex flex-col gap-2 text-gray-300">
                                                        {/* Descripción */}
                                                        <p>
                                                            <strong>Description:</strong>{' '}
                                                            {spell.description}
                                                            {compareSpell &&
                                                                spell.description !==
                                                                    compareSpell.description && (
                                                                    <span className="ml-2 text-red-400">
                                                                        (Changes:{'=>'}"
                                                                        {spell.description}
                                                                        ")
                                                                    </span>
                                                                )}
                                                        </p>
                                                        {/* Enfriamiento */}
                                                        <p>
                                                            <strong>Cooldown:</strong>{' '}
                                                            {spell.cooldownBurn}
                                                            {compareSpell &&
                                                                spell.cooldownBurn !==
                                                                    compareSpell.cooldownBurn && (
                                                                    <span className="ml-2 text-red-400">
                                                                        (Changes: {'=>'}{' '}
                                                                        {spell.cooldownBurn})
                                                                    </span>
                                                                )}
                                                        </p>
                                                        {/* Costos */}
                                                        <p>
                                                            <strong>Cost:</strong> {spell.costBurn}{' '}
                                                            {spell.costType}
                                                            {compareSpell &&
                                                                spell.costBurn !==
                                                                    compareSpell.costBurn && (
                                                                    <span className="ml-2 text-red-400">
                                                                        (Changes: {'=>'}{' '}
                                                                        {spell.costBurn}{' '}
                                                                        {spell.costType})
                                                                    </span>
                                                                )}
                                                        </p>
                                                        {/* Rango */}
                                                        <p>
                                                            <strong>Range:</strong>{' '}
                                                            {spell.rangeBurn}
                                                            {compareSpell &&
                                                                spell.rangeBurn !==
                                                                    compareSpell.rangeBurn && (
                                                                    <span className="ml-2 text-red-400">
                                                                        (Changes: {'=>'}{' '}
                                                                        {spell.rangeBurn})
                                                                    </span>
                                                                )}
                                                        </p>
                                                    </div>

                                                    {/* Nombre e imagen de la habilidad del segundo campeón
                                                    {compareSpell && (
                                                        <div className="flex flex-col items-center">
                                                            <h2 className="text-xl font-bold text-teal-400">
                                                                {compareSpell.name}
                                                            </h2>
                                                        </div>
                                                    )} */}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>
                        </ModalBody>
                    )
                )}
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ChampInfo
