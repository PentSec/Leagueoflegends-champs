import { Button, Modal, ModalBody, ModalContent, ModalFooter, Spinner } from '@nextui-org/react'
import { buildPositionIndex, getChampionLanes } from '@/utils'
import { useMemo, useEffect, useState } from 'react'
import useChampionVoice from './useChampionVoice'
import getSkinImages from './getSkingImages'
import ChampionAbilities from './ChampionAbilities'
import HeaderChampInfo from './HeaderChampInfo'

const VIDEO_BASE_URL = 'https://d28xe8vt774jo5.cloudfront.net/'

function ChampInfo({
    selectedChamp = {},
    selectedCompareChamp = {},
    isLoadingChamp,
    onClose,
    lanesRates,
    selectVersion,
    selectVersionCompare
}) {
    if (!selectedChamp) {
        return <main>Loading champion data...</main>
    }
    const [isModalFullyLoaded, setIsModalFullyLoaded] = useState(false)
    const positionIndex = useMemo(() => {
        return lanesRates ? buildPositionIndex(lanesRates) : {}
    }, [lanesRates])

    const lanes = getChampionLanes(selectedChamp.key, positionIndex)
    const voiceChamp = useChampionVoice(selectedChamp?.voice)
    const images = useMemo(() => getSkinImages(selectedChamp), [selectedChamp])

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

    const abilityVideos = [
        {
            name: selectedChamp.assets.passive.name,
            videoUrl: `${VIDEO_BASE_URL}${selectedChamp.assets.passive.abilityVideoPath}`
        },
        ...selectedChamp.assets.spells?.map((spell) => ({
            name: spell.name,
            videoUrl: `${VIDEO_BASE_URL}${spell.abilityVideoPath}`
        }))
    ]

    return (
        <Modal
            scrollBehavior="inside"
            backdrop="blur"
            size="full"
            isOpen={Boolean(selectedChamp)}
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
                    selectedChamp && (
                        <ModalBody>
                            <section className="relative flex flex-col items-center justify-center p-4">
                                <HeaderChampInfo
                                    imagesValue={images}
                                    champValue={selectedChamp}
                                    lanesValue={lanes}
                                />
                            </section>
                            <section>
                                <div className="flex flex-col items-center justify-center w-full p-4">
                                    Current Ver:{selectVersion} to compare with ver:
                                    {selectVersionCompare || 'None to compare'}
                                </div>
                            </section>
                            <section className="flex flex-col items-center justify-center w-full p-4">
                                <ChampionAbilities
                                    c={selectedChamp}
                                    cc={selectedCompareChamp}
                                    abilityVideos={abilityVideos}
                                    lanesValue={lanes}
                                    selectVersion={selectVersion}
                                    selectVersionCompare={selectVersionCompare}
                                />
                            </section>
                        </ModalBody>
                    )
                )}
                <ModalFooter>
                    <Button size="sm" color="primary" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ChampInfo
