import { useGetChamps, useGetVersion, useGetLang } from '@/hooks'
import { ScrollShadow, Card, Image, Spinner } from '@nextui-org/react'
import { useState, useMemo } from 'react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import {
    SearchChampsComponent,
    TooltipComp,
    ChampInfo,
    SelectVersion,
    SelectLang,
    FilterRoleChamp
} from '@/components'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

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
    const [itemToShow, setItemToShow] = useState(50)
    const [searchChamps, setSearchChamps] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [language, setLanguage] = useState('es_MX')
    const [version, setVersion] = useState('14.22.1')
    const [selectedRole, setSelectedRole] = useState('')
    const { versions, isLoadingVersion, errorVersion } = useGetVersion()
    const { languages, isLoadingLang, errorLang } = useGetLang()
    const { champs, isLoading, error, selectedChamp, isLoadingChamp, fetchChampDetails } =
        useGetChamps(language, version)

    const roleChamps = useMemo(() => {
        if (!champs || champs.length === 0) return []
        const allRoles = champs.flatMap((champ) => champ.roles)
        return Array.from(new Set(allRoles))
    }, [champs])
    console.log(`roleChamps`, roleChamps)

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

    const filteredChamps = useMemo(() => {
        return (
            champs?.filter((champ) => {
                const matchesSearch = champ.name?.toLowerCase().includes(searchChamps.toLowerCase())
                const matchesRole = selectedRole ? champ.roles.includes(selectedRole) : true
                return matchesSearch && matchesRole
            }) || []
        )
    }, [champs, searchChamps, selectedRole])

    const loadMore = () => {
        setItemToShow((prev) => prev + 10)
    }

    const hasMore = itemToShow < filteredChamps.length

    const [loaderRef, scrollerRef] = useInfiniteScroll({
        hasMore,
        onLoadMore: loadMore
    })

    const hoverSound = useMemo(() => new Audio('/Leagueoflegends-champs/on-hover.ogg'), [])
    const clickSound = useMemo(() => new Audio('/Leagueoflegends-champs/onopen-select.ogg'), [])

    useEffect(() => {
        hoverSound.load()
        clickSound.load()
    }, [, hoverSound, clickSound])

    return (
        <main className="relative w-full">
            <FilterRoleChamp
                value={roleChamps || []}
                key={selectedRole}
                setSelectedRole={setSelectedRole}
            />
            <SelectLang
                value={language}
                setLanguage={setLanguage}
                languages={languages}
                isLoadingLang={isLoadingLang}
                isErrorLang={errorLang}
            />
            <SelectVersion
                value={version}
                setVersion={setVersion}
                versions={versions}
                isLoadingVer={isLoadingVersion}
                isErrorVer={errorVersion}
            />
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
                                    onPressStart={() => {
                                        if (champ.voice) {
                                            clickSound.pause()
                                            clickSound.currentTime = 0
                                            clickSound.play()
                                            const sound = new Audio(champ.voice)
                                            sound
                                                .play()
                                                .catch((err) =>
                                                    console.error('Error playing sound:', err)
                                                )
                                        } else {
                                            console.warn('No voice file found for this champion.')
                                        }
                                    }}
                                    onMouseEnter={() => {
                                        hoverSound.pause()
                                        hoverSound.currentTime = 0
                                        hoverSound.play()
                                    }}
                                    isPressable
                                >
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
