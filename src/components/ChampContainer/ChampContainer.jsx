import { useGetChamps, useGetVersion, useGetLang, useGetLanesRates } from '@/hooks'
import { ScrollShadow, Card, Image, Spinner, CardBody, Divider } from '@nextui-org/react'
import { useState, useMemo } from 'react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import {
    SearchChamps,
    TooltipComp,
    ChampInfo,
    SelectVersion,
    SelectLang,
    FilterRoleChamp,
    SelectLanes,
    SelectVersionCompare
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
    //const states
    const [itemToShow, setItemToShow] = useState(20)
    const [searchChamps, setSearchChamps] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [language, setLanguage] = useState('en_US')
    const [version, setVersion] = useState('')
    const [versionCompare, setVersionCompare] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [selectedLane, setSelectedLane] = useState('')

    //const by hooks
    const { lanesRates, loadingLane } = useGetLanesRates()
    const { versions, isLoadingVersion, errorVersion } = useGetVersion()
    const { languages, isLoadingLang, errorLang } = useGetLang()
    const {
        champs,
        isLoading,
        error,
        selectedChamp,
        selectedCompareChamp,
        isLoadingChamp,
        fetchChampDetails,
        setSelectedCompareChamp
    } = useGetChamps(language, version)

    const roleChamps = useMemo(() => {
        if (!champs || champs.length === 0) return []
        const allRoles = champs.flatMap((champ) => champ.roles)
        return Array.from(new Set(allRoles))
    }, [champs])

    const openModal = (champId) => {
        fetchChampDetails(champId)

        if (versionCompare && versionCompare !== version) {
            fetchChampDetails(champId, versionCompare)
        } else {
            setSelectedCompareChamp(null)
        }

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
                const matchesLane = selectedLane
                    ? lanesRates[selectedLane]?.[champ.key] !== undefined
                    : true
                return matchesSearch && matchesRole && matchesLane
            }) || []
        )
    }, [champs, searchChamps, selectedRole, selectedLane])

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
    }, [hoverSound, clickSound])

    useEffect(() => {
        const storedVersion = localStorage.getItem('selectedVersion')
        if (storedVersion) {
            setVersion(storedVersion)
        } else if (versions.length > 0) {
            setVersion(versions[0])
        }
    }, [versions])

    return (
        <main className="relative w-full">
            {loadingLane ? (
                <div className="flex items-center justify-center h-screen">
                    <Spinner label="Loading lanes rates..." />
                </div>
            ) : !lanesRates ? (
                <div>Error to get lanes</div>
            ) : (
                <>
                    <div className="flex flex-col items-center justify-center gap-2 mb-4 lg:flex-row">
                        <SearchChamps value={searchChamps} changeValue={setSearchChamps} />
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
                        <SelectVersionCompare
                            value={versionCompare}
                            setVersionCompare={setVersionCompare}
                            currentVersions={versions}
                        />
                        <Card
                            radius="sm"
                            className="w-full bg-transparent border lg:h-12 border-default lg:w-auto "
                        >
                            <CardBody className="items-center gap-1 overflow-hidden lg:flex-row text-small">
                                <FilterRoleChamp
                                    value={roleChamps || []}
                                    initialKey={selectedRole}
                                    setSelectedRole={setSelectedRole}
                                />
                                <Divider orientation="vertical" className="mx-2" />
                                <SelectLanes
                                    value={selectedLane}
                                    onChangeValue={setSelectedLane}
                                    selectLanes={lanesRates}
                                />
                            </CardBody>
                        </Card>
                    </div>
                    {isModalOpen && (
                        <ChampInfo
                            lanesRates={lanesRates}
                            selectedChamp={selectedChamp}
                            selectedCompareChamp={selectedCompareChamp}
                            isLoadingChamp={isLoadingChamp}
                            onClose={closeModal}
                            selectVersion={version}
                            selectVersionCompare={versionCompare}
                        />
                    )}
                    <ScrollShadow
                        className="h-[calc(85vh-32px)] overflow-auto p-12 gap-4"
                        ref={scrollerRef}
                    >
                        <div className="grid grid-cols-3 gap-4 p-2 mb-4 lg:grid-cols-6">
                            {filteredChamps.slice(0, itemToShow).map((champ) => (
                                <AnimatePresence key={champ.id}>
                                    <TooltipComp selectedChamp={champ} lanesRates={lanesRates}>
                                        <MotionCard
                                            isHoverable
                                            variants={cardVariants}
                                            key={champ.id}
                                            className="relative z-30 items-center content-center justify-center bg-transparent border-none w-fit h-fit"
                                            initial="hidden"
                                            animate="visible"
                                            shadow="md"
                                            onPress={() => openModal(champ.id)}
                                            onPressStart={() => {
                                                clickSound.pause()
                                                clickSound.currentTime = 0
                                                clickSound.play()
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
                </>
            )}
        </main>
    )
}

export default ChampContainer
