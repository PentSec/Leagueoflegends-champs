import { Image, Modal, ModalBody, ModalContent, ModalFooter, Spinner } from '@nextui-org/react'
import ImageGallery from 'react-image-gallery'

function ChampInfo({ selectedChamp, isLoadingChamp, onClose }) {
    const s = selectedChamp
    const images =
        s?.skins.map((skin) => ({
            original: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${s.id}_${skin.num}.jpg`,
            thumbnail: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${s.id}_${skin.num}.jpg`,
            description: skin.name,
            originalAlt: skin.name,
            thumbnailAlt: skin.name
        })) || []

    return (
        <Modal
            scrollBehavior="inside"
            backdrop="blur"
            size="full"
            isOpen={true}
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
                    s && (
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
                                        {s.name}
                                    </h1>
                                    <span className="text-4xl italic font-bold text-teal-400 uppercase font-beaufortBold">
                                        {s.title}
                                    </span>

                                    <div className="grid grid-cols-3 gap-4 mt-2 font-spiegel text-default-foreground">
                                        <p>{s.lore}</p>
                                    </div>
                                </div>
                            </section>
                            <section className="flex items-center justify-center w-full h-auto">
                                <div className="relative items-center w-full gap-4 p-4 px-6 text-center "></div>
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
