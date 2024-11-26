import { Image, Tooltip } from '@nextui-org/react'
const VIDEO_BASE_URL = 'https://d28xe8vt774jo5.cloudfront.net/'
const replaceDynamicDescriptionVariables = (description) => {
    return description
        .replace(/@(\w+)\*-?\d+@%?/g, '?%')
        .replace(/@(\w+)@/g, '?') // Reemplaza contenido entre @...@ con '?'
        .replace(/<[^>]+>/g, '') // Elimina contenido entre <> incluyendo los símbolos <>
}

const ChampionAbilities = ({ c, cc, selectVersionCompare, selectVersion }) => {
    const abilityVideosMap = [
        {
            name: c.assets.passive.name,
            videoUrl: `${VIDEO_BASE_URL}${c.assets.passive.abilityVideoPath}`
        },
        ...c.assets.spells?.map((spell) => ({
            name: spell.name,
            videoUrl: `${VIDEO_BASE_URL}${spell.abilityVideoPath}`
        }))
    ].reduce((acc, ability) => {
        acc[ability.name] = ability.videoUrl
        return acc
    }, {})

    return (
        <>
            <h1 className="mb-4 text-2xl font-bold text-default-foreground font-beaufortBold">
                Champion Abilities
            </h1>
            <div className="flex flex-col gap-4 lg:flex-row">
                {c.passive && (
                    <div className="flex flex-col items-start gap-4 p-4 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                        <div className="flex items-start gap-6">
                            <div className="flex flex-col items-center">
                                <Tooltip
                                    content={
                                        <div className="flex flex-col gap-2 text-gray-300 max-w-[400px] text-tiny">
                                            <h2 className="text-xl font-bold text-center text-teal-400 font-spiegel">
                                                {c.passive.name}
                                            </h2>

                                            <p>
                                                <strong>Description:</strong>{' '}
                                                {c.passive.description}
                                                {cc?.passive?.description &&
                                                    c.passive.description !==
                                                        cc.passive.description && (
                                                        <span className="ml-2 text-red-400">
                                                            ({selectVersionCompare}: {'=>'}{' '}
                                                            {cc.passive.description})
                                                        </span>
                                                    )}
                                            </p>
                                            <p className="text-tiny text-slate-400">
                                                v.{selectVersion}
                                            </p>
                                            {abilityVideosMap[c.passive.name] && (
                                                <video
                                                    width="100%"
                                                    className="mt-2 rounded-lg"
                                                    autoPlay
                                                    loop
                                                >
                                                    <source
                                                        src={abilityVideosMap[c.passive.name]}
                                                        type="video/webm"
                                                    />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </div>
                                    }
                                >
                                    <Image
                                        src={`https://ddragon.leagueoflegends.com/cdn/${selectVersion}/img/passive/${c.passive.image.full}`}
                                        alt={c.passive.name}
                                        className="w-12 h-12 mb-4"
                                        radius="full"
                                    />
                                </Tooltip>
                                <h1 className="text-xl font-bold text-teal-400 font-spiegel">
                                    {c.passive.name}
                                </h1>
                            </div>
                        </div>
                    </div>
                )}
                {c.spells?.map((spell, index) => {
                    const compareSpell = cc?.spells?.[index]
                    const spellVideoUrl = abilityVideosMap[spell.name]
                    const dynamicDescription = c.assets.spells?.[index]?.dynamicDescription
                    const compareDynamicDescription =
                        cc?.assets?.spells?.[index]?.dynamicDescription
                    const replacedDynamicDescription = dynamicDescription
                        ? replaceDynamicDescriptionVariables(dynamicDescription)
                        : ''
                    const replacedCompareDynamicDescription = compareDynamicDescription
                        ? replaceDynamicDescriptionVariables(compareDynamicDescription)
                        : ''

                    return (
                        <div
                            key={spell.id}
                            className="flex flex-col items-start gap-4 p-4 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                        >
                            <div className="flex items-start gap-6">
                                <div className="flex flex-col items-center">
                                    <Tooltip
                                        content={
                                            <div className=" max-w-[400px] flex flex-col gap-2 text-gray-300 text-tiny">
                                                <h2 className="text-xl font-bold text-teal-400">
                                                    {spell.name}
                                                </h2>
                                                <div>
                                                    <p className="text-red-700">
                                                        <strong>Cooldown:</strong>{' '}
                                                        {spell.cooldownBurn}
                                                        {compareSpell &&
                                                            spell.cooldownBurn !==
                                                                compareSpell.cooldownBurn && (
                                                                <span className="ml-2 text-red-400">
                                                                    (v.{selectVersionCompare}:{' '}
                                                                    {'=>'}{' '}
                                                                    {compareSpell.cooldownBurn})
                                                                </span>
                                                            )}
                                                    </p>
                                                    <p>
                                                        <strong>Cost:</strong> {spell.costBurn}{' '}
                                                        {spell.costType}
                                                        {compareSpell &&
                                                            spell.costBurn !==
                                                                compareSpell.costBurn && (
                                                                <span className="ml-2 text-red-400">
                                                                    (v.{selectVersionCompare}:{' '}
                                                                    {'=>'} {compareSpell.costBurn}{' '}
                                                                    {compareSpell.costType})
                                                                </span>
                                                            )}
                                                    </p>
                                                    <p>
                                                        <strong>Range:</strong> {spell.rangeBurn}
                                                        {compareSpell &&
                                                            spell.rangeBurn !==
                                                                compareSpell.rangeBurn && (
                                                                <span className="ml-2 text-red-400">
                                                                    (v.{selectVersionCompare}:{' '}
                                                                    {'=>'} {compareSpell.rangeBurn})
                                                                </span>
                                                            )}
                                                    </p>
                                                </div>

                                                <p>
                                                    <strong>Description:</strong>{' '}
                                                    {spell.description}
                                                    {compareSpell &&
                                                        spell.description !==
                                                            compareSpell.description && (
                                                            <span className="ml-2 text-red-400">
                                                                (v.{selectVersionCompare}:{'=>'}"
                                                                {compareSpell.description}
                                                                ")
                                                            </span>
                                                        )}
                                                </p>
                                                {replacedDynamicDescription && (
                                                    <p className="text-tiny text-warning">
                                                        <strong>Dynamic Description:</strong>{' '}
                                                        {replacedDynamicDescription}
                                                        {replacedCompareDynamicDescription &&
                                                            replacedDynamicDescription !==
                                                                replacedCompareDynamicDescription && (
                                                                <span className="ml-2 text-red-400">
                                                                    (v.{selectVersionCompare}:{' '}
                                                                    {'=>'}{' '}
                                                                    {
                                                                        replacedCompareDynamicDescription
                                                                    }
                                                                    )
                                                                </span>
                                                            )}
                                                    </p>
                                                )}

                                                <p className="text-tiny text-slate-400">
                                                    v.{selectVersion}
                                                </p>
                                                {spellVideoUrl && (
                                                    <video
                                                        width="100%"
                                                        className="mt-2 rounded-lg"
                                                        autoPlay
                                                        loop
                                                    >
                                                        <source
                                                            src={spellVideoUrl}
                                                            type="video/webm"
                                                        />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                            </div>
                                        }
                                    >
                                        <Image
                                            src={`https://ddragon.leagueoflegends.com/cdn/${selectVersion}/img/spell/${spell.image.full}`}
                                            alt={spell.name}
                                            className="w-12 h-12 mb-4"
                                            radius="full"
                                        />
                                    </Tooltip>
                                    <h1 className="text-xl font-bold text-center text-teal-400 font-spiegel">
                                        {spell.name} asd
                                    </h1>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ChampionAbilities
