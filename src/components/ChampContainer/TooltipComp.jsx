import { Avatar, Divider, Tooltip } from '@nextui-org/react'
import { buildPositionIndex, getChampionLanes, laneIcon } from '@/utils'

import { useMemo } from 'react'

function TooltipComp({ selectedChamp, lanesRates, children }) {
    const c = selectedChamp
    const positionIndex = useMemo(() => {
        return lanesRates ? buildPositionIndex(lanesRates) : {}
    }, [lanesRates])

    const lanes = getChampionLanes(c.key, positionIndex)

    return (
        <Tooltip
            placement="left-start"
            closeDelay={0}
            content={
                <div className="max-w-[300px] p-3 text-white rounded-md shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                        <Avatar
                            src={c.avatarImage}
                            alt={`${c.name} avatar`}
                            className="object-cover w-12 h-12 rounded-full"
                        />
                        <div>
                            <h1 className="text-lg font-bold font-beaufortBold">{c.name}</h1>
                            <span className="text-sm italic text-gray-300 font-beaufortBold">
                                {c.title}
                            </span>
                        </div>
                    </div>
                    <Divider />
                    <div className="box-border block leading-6">
                        <div className="mt-2 min-w-[250px] ">
                            <div>
                                <h2 className="font-semibold text-gray-200">Info</h2>
                                <p>
                                    Attack: <span className="text-gray-400">{c.info.attack}</span>
                                </p>
                                <p>
                                    Defense: <span className="text-gray-400">{c.info.defense}</span>
                                </p>
                                <p>
                                    Magic: <span className="text-gray-400">{c.info.magic}</span>
                                </p>
                                <p>
                                    Difficulty:{' '}
                                    <span className="text-gray-400">{c.info.difficulty}</span>
                                </p>
                            </div>
                        </div>
                        <Divider />
                        <div className="gap-4 mt-2 text-sm ">
                            <div>
                                <h2 className="font-semibold text-gray-200">Stats</h2>
                                <p>
                                    HP: {c.stats.hp} (+{c.stats.hpperlevel} * Lvl)
                                </p>
                                <p>
                                    MP: {c.stats.mp} (+{c.stats.mpperlevel} * Lvl)
                                </p>
                                <p>
                                    Armor: {c.stats.armor} (+
                                    {c.stats.armorperlevel} * Lvl)
                                </p>
                                <p>Attack Range: {c.stats.attackrange}</p>
                                <p>
                                    hp Regen: {c.stats.hpregen} (+{c.stats.hpregenperlevel} * Lvl)
                                </p>
                                <p>
                                    mp Regen: {c.stats.mpregen} (+{c.stats.mpregenperlevel} * Lvl)
                                </p>
                                <p>
                                    crit: {c.stats.crit} (+{c.stats.critperlevel} * Lvl)
                                </p>
                                <p>
                                    attack Damage {c.stats.attackdamage} (+
                                    {c.stats.attackdamageperlevel} * Lvl)
                                </p>
                                <p>
                                    attack Speed: {c.stats.attackspeed} (+
                                    {c.stats.attackspeedperlevel} * Lvl)
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
                            <h2 className="font-semibold text-gray-200">Roles</h2>
                            <p>{c.roles.join(', ')}</p>
                            <h2 className="mt-2 font-semibold text-gray-200">Resource</h2>
                            <p>{c.partype}</p>
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
