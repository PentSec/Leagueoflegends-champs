import useGetChamps from '@/hooks/useGetChamps'
import { ScrollShadow, Card, Image, Spinner } from '@nextui-org/react'
import { useState } from 'react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import { SearchChampsComponent, TooltipComp, ChampInfo } from '@/components'
import { motion, AnimatePresence } from 'framer-motion'

const MotionCard = motion.create(Card)

const cardVariants = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.1
        }
    }
}

function ChampContainer() {
    const { champs, isLoading, error, selectedChamp, isLoadingChamp, fetchChampDetails } =
        useGetChamps()
    const [itemToShow, setItemToShow] = useState(50)
    const [searchChamps, setSearchChamps] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = (champId) => {
        fetchChampDetails(champId)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    if (isLoading) {
        console.log(`isLoading`, isLoading)
    }

    if (error) {
        console.log(`error`, error)
    }

    if (champs) {
        console.log(`champs en componente`, champs)
    }

    const filteredChamps =
        champs?.filter((champs) =>
            champs?.name?.toLowerCase().includes(searchChamps.toLowerCase())
        ) || []

    const loadMore = () => {
        setItemToShow((prev) => prev + 10)
    }

    const hasMore = itemToShow < filteredChamps.length

    const [loaderRef, scrollerRef] = useInfiniteScroll({
        hasMore,
        onLoadMore: loadMore
    })

    return (
        <main className="relative w-full">
            <SearchChampsComponent value={searchChamps} changeValue={setSearchChamps} />
            <ScrollShadow
                className="h-[calc(85vh-32px)] overflow-auto p-12 gap-4"
                ref={scrollerRef}
            >
                <div className="grid grid-cols-3 gap-4 p-2 mb-4 lg:grid-cols-6">
                    {filteredChamps.slice(0, itemToShow).map((champ) => (
                        <AnimatePresence key={champ.id}>
                            <TooltipComp champ={champ}>
                                <MotionCard
                                    isHoverable
                                    variants={cardVariants}
                                    key={champ.id}
                                    className="relative z-30 items-center content-center justify-center bg-transparent border-none w-fit h-fit"
                                    transition={{ duration: 0.2, delay: champ.id * 0.1 }}
                                    initial="hidden"
                                    animate="visible"
                                    shadow="md"
                                    onPress={() => openModal(champ.id)}
                                    isPressable
                                >
                                    {/* <div className='absolute z-10 bg-[url("border.png")] bg-no-repeat bg-center bg-cover w-full h-full rounded-md pointer-events-none' /> */}
                                    <Image
                                        isZoomed
                                        radius="none"
                                        width="100%"
                                        height="100%"
                                        alt={champ.name}
                                        src={champ.loadingImage}
                                        className="border-none object-cover w-full h-full max-w-[350px] max-h-[350px] z-0"
                                    />
                                </MotionCard>
                            </TooltipComp>
                        </AnimatePresence>
                    ))}
                </div>
                {hasMore && (
                    <div className="flex justify-center w-full">
                        <Spinner ref={loaderRef} color="white" />
                    </div>
                )}
            </ScrollShadow>
            {isModalOpen && (
                <ChampInfo
                    selectedChamp={selectedChamp}
                    isLoadingChamp={isLoadingChamp}
                    onClose={closeModal}
                />
            )}
        </main>
    )
}

export default ChampContainer
