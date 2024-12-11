import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Spinner,
    Avatar,
    Divider
} from '@nextui-org/react'
import { buildPositionIndex, getChampionLanes, laneIcon } from '@/utils'
import { ChampInfo } from '@/components'
import { useMemo, useState, useEffect } from 'react'

function TooltipChamp({
    selectedChamp,
    lanesRates,
    isOpen,
    onOpenChange,
    setSelectedCompareChamp,
    selectedCompareChamp,
    isLoadingChamp,
    version,
    versionCompare,
    fetchChampDetails
}) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const clickSound = useMemo(() => new Audio('/Leagueoflegends-champs/onopen-select.ogg'), [])
    const positionIndex = useMemo(() => {
        return lanesRates ? buildPositionIndex(lanesRates) : {}
    }, [lanesRates])

    useEffect(() => {
        clickSound.load()
    }, [clickSound])

    const openModal = (champId) => {
        setIsModalOpen(true)
        fetchChampDetails(champId)
        console.log(`setmodal de openmodal`, isModalOpen)

        if (versionCompare && versionCompare !== version) {
            fetchChampDetails(champId, versionCompare)
        } else {
            setSelectedCompareChamp(null)
        }

        console.log(`setmodal de openmodal2`, isModalOpen)
    }

    console.log(`setmodal de openmodal3`, isModalOpen)

    const closeModal = () => {
        setIsModalOpen(false)
        onOpenChange(false)
    }

    if (isLoadingChamp || !selectedChamp) {
        return <Spinner label="Loading champion data..." color="default" labelColor="foreground" />
    }

    const lanes = getChampionLanes(selectedChamp.key, positionIndex)
    return (
        <>
            <Drawer
                backdrop="transparent"
                isOpen={isOpen}
                placement="left"
                onOpenChange={onOpenChange}
                size="xs"
            >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">
                                {console.log(selectedChamp.name)}
                                {selectedChamp.name}
                            </DrawerHeader>
                            <DrawerBody>
                                <div className="max-w-[300px] p-3 text-white">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Avatar
                                            src={selectedChamp.avatarImage}
                                            alt={`${selectedChamp.name} avatar`}
                                            className="object-cover w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <h1 className="text-lg font-bold font-beaufortBold">
                                                {selectedChamp.name}
                                            </h1>
                                            <span className="text-sm italic text-gray-300 font-beaufortBold">
                                                {selectedChamp.title}
                                            </span>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className="box-border block leading-6">
                                        <div className="mt-2 min-w-[250px] ">
                                            <div>
                                                <h2 className="font-semibold text-gray-200">
                                                    Info
                                                </h2>
                                                <p>
                                                    Attack:{' '}
                                                    <span className="text-gray-400">
                                                        {selectedChamp.info.attack}
                                                    </span>
                                                </p>
                                                <p>
                                                    Defense:{' '}
                                                    <span className="text-gray-400">
                                                        {selectedChamp.info.defense}
                                                    </span>
                                                </p>
                                                <p>
                                                    Magic:{' '}
                                                    <span className="text-gray-400">
                                                        {selectedChamp.info.magic}
                                                    </span>
                                                </p>
                                                <p>
                                                    Difficulty:{' '}
                                                    <span className="text-gray-400">
                                                        {selectedChamp.info.difficulty}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <Divider />
                                        <div className="gap-4 mt-2 text-sm ">
                                            <div>
                                                <h2 className="font-semibold text-gray-200">
                                                    Stats
                                                </h2>
                                                <p>
                                                    HP: {selectedChamp.stats.hp} (+
                                                    {selectedChamp.stats.hpperlevel} * Lvl)
                                                </p>
                                                <p>
                                                    MP: {selectedChamp.stats.mp} (+
                                                    {selectedChamp.stats.mpperlevel} * Lvl)
                                                </p>
                                                <p>
                                                    Armor: {selectedChamp.stats.armor} (+
                                                    {selectedChamp.stats.armorperlevel} * Lvl)
                                                </p>
                                                <p>
                                                    Attack Range: {selectedChamp.stats.attackrange}
                                                </p>
                                                <p>
                                                    hp Regen: {selectedChamp.stats.hpregen} (+
                                                    {selectedChamp.stats.hpregenperlevel} * Lvl)
                                                </p>
                                                <p>
                                                    mp Regen: {selectedChamp.stats.mpregen} (+
                                                    {selectedChamp.stats.mpregenperlevel} * Lvl)
                                                </p>
                                                <p>
                                                    crit: {selectedChamp.stats.crit} (+
                                                    {selectedChamp.stats.critperlevel} * Lvl)
                                                </p>
                                                <p>
                                                    attack Damage {selectedChamp.stats.attackdamage}{' '}
                                                    (+
                                                    {selectedChamp.stats.attackdamageperlevel} *
                                                    Lvl)
                                                </p>
                                                <p>
                                                    attack Speed: {selectedChamp.stats.attackspeed}{' '}
                                                    (+
                                                    {selectedChamp.stats.attackspeedperlevel} * Lvl)
                                                </p>
                                            </div>
                                        </div>
                                        <Divider />

                                        <div className="mt-2">
                                            <h2 className="font-semibold text-gray-200">
                                                Position
                                            </h2>
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
                                                                        Pick Rate{' '}
                                                                        {(rate * 100).toFixed(2)}%
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <p>Dont have date for this champion</p>
                                                )}
                                            </ul>
                                            <h2 className="font-semibold text-gray-200">Roles</h2>
                                            <p>{selectedChamp.roles.join(', ')}</p>
                                            <h2 className="mt-2 font-semibold text-gray-200">
                                                Resource
                                            </h2>
                                            <p>{selectedChamp.partype}</p>
                                        </div>
                                    </div>
                                </div>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => openModal(selectedChamp.id)}
                                    onPressStart={() => {
                                        clickSound.pause()
                                        clickSound.currentTime = 0
                                        clickSound.play()
                                    }}
                                >
                                    See all Details
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
            {isModalOpen && selectedChamp && (
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
        </>
    )
}

export default TooltipChamp
