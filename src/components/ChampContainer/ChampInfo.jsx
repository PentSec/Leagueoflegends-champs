import { Modal, ModalBody, ModalContent, ModalFooter, Spinner } from '@nextui-org/react'
import ImageGallery from 'react-image-gallery'
import { buildPositionIndex, getChampionLanes } from '@/utils'
import { useMemo, useEffect, useState } from 'react'

function ChampInfo({ selectedChamp = {}, isLoadingChamp, onClose, lanesRates }) {
    const c = selectedChamp
    if (!c) {
        return <div>Loading champion data...</div>
    }
    const [isModalFullyLoaded, setIsModalFullyLoaded] = useState(false)
    const positionIndex = useMemo(() => {
        return lanesRates ? buildPositionIndex(lanesRates) : {}
    }, [lanesRates])

    const lanes = getChampionLanes(c.key, positionIndex)

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
                                        <p>{c.lore}</p>
                                    </div>
                                </div>
                            </section>
                            <section className="flex flex-col items-start justify-start w-full p-4">
                                <h2 className="text-2xl font-bold text-white">theLanes</h2>
                                <ul className="mt-2 text-lg text-gray-300">
                                    {lanes.length > 0 ? (
                                        lanes.map(({ lane, rate }) => (
                                            <li key={lane}>{(rate * 100).toFixed(2)}%</li>
                                        ))
                                    ) : (
                                        <p>dont have data for this champ.</p>
                                    )}
                                </ul>
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
