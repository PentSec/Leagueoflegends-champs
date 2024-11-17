import { Avatar, Divider, Spinner, Tooltip } from '@nextui-org/react'
import { buildPositionIndex, getChampionLanes, laneIcon } from '@/utils'
import { useChampionData } from '@/hooks'
import { useMemo } from 'react'

function TooltipComp({ champ, children }) {
    const { championData, loading } = useChampionData()

    const positionIndex = useMemo(() => {
        return championData ? buildPositionIndex(championData) : {}
    }, [championData])

    if (loading) {
        return <Spinner label="Loading..." />
    }

    if (!championData) {
        return <div>Error to load data</div>
    }

    const champKey = champ.key
    const lanes = getChampionLanes(champKey, positionIndex)

    return (
        <Tooltip
            placement="left-start"
            closeDelay={0}
            content={
                <div className="max-w-[300px] p-3 text-white rounded-md shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                        <Avatar
                            src={champ.avatarImage}
                            alt={`${champ.name} avatar`}
                            className="object-cover w-12 h-12 rounded-full"
                        />
                        <div>
                            <h1 className="text-lg font-bold font-beaufortBold">{champ.name}</h1>
                            <span className="text-sm italic text-gray-300 font-beaufortBold">
                                {champ.title}
                            </span>
                        </div>
                    </div>
                    <Divider />
                    <div className="box-border block leading-6 font-spiegel">
                        <div className="mt-2 min-w-[250px] ">
                            <div>
                                <h2 className="font-semibold text-gray-200">Info</h2>
                                <p>
                                    Attack:{' '}
                                    <span className="text-gray-400">{champ.info.attack}</span>
                                </p>
                                <p>
                                    Defense:{' '}
                                    <span className="text-gray-400">{champ.info.defense}</span>
                                </p>
                                <p>
                                    Magic: <span className="text-gray-400">{champ.info.magic}</span>
                                </p>
                                <p>
                                    Difficulty:{' '}
                                    <span className="text-gray-400">{champ.info.difficulty}</span>
                                </p>
                            </div>
                        </div>
                        <Divider />
                        <div className="gap-4 mt-2 text-sm ">
                            <div>
                                <h2 className="font-semibold text-gray-200">Stats</h2>
                                <p>
                                    HP: {champ.stats.hp} (+{champ.stats.hpperlevel} * Lvl)
                                </p>
                                <p>
                                    MP: {champ.stats.mp} (+{champ.stats.mpperlevel} * Lvl)
                                </p>
                                <p>
                                    Armor: {champ.stats.armor} (+
                                    {champ.stats.armorperlevel} * Lvl)
                                </p>
                                <p>Attack Range: {champ.stats.attackrange}</p>
                                <p>
                                    hp Regen: {champ.stats.hpregen} (+{champ.stats.hpregenperlevel}{' '}
                                    * Lvl)
                                </p>
                                <p>
                                    mp Regen: {champ.stats.mpregen} (+{champ.stats.mpregenperlevel}{' '}
                                    * Lvl)
                                </p>
                                <p>
                                    crit: {champ.stats.crit} (+{champ.stats.critperlevel} * Lvl)
                                </p>
                                <p>
                                    attack Damage {champ.stats.attackdamage} (+
                                    {champ.stats.attackdamageperlevel} * Lvl)
                                </p>
                                <p>
                                    attack Speed: {champ.stats.attackspeed} (+
                                    {champ.stats.attackspeedperlevel} * Lvl)
                                </p>
                            </div>
                        </div>
                        <Divider />

                        <div className="mt-2">
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
                                                        className="flex-shrink-0 w-6 h-6 text-tiny"
                                                    />

                                                    <span className="flex flex-col text-tiny">
                                                        {' '}
                                                        <strong>{lane} Laner:</strong> Pick Rate{' '}
                                                        {(rate * 100).toFixed(2)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p>No hay datos de roles para este campeón.</p>
                                )}
                            </ul>
                            <h2 className="font-semibold text-gray-200">Roles</h2>
                            <p>{champ.roles.join(', ')}</p>
                            <h2 className="mt-2 font-semibold text-gray-200">Resource</h2>
                            <p>{champ.partype}</p>
                        </div>
                    </div>
                </div>
            }
        >
            {children}
        </Tooltip>
    )
}

export default TooltipComp
