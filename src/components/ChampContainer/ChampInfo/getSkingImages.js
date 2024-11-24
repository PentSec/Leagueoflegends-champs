const getSkinImages = (champion) => {
    return (
        champion?.skins?.map((skin, index) => {
            const skinNum =
                skin.num !== undefined
                    ? skin.num
                    : parseInt(skin.id.slice(-2)) - parseInt(champion.skins[0].id.slice(-2))
            return {
                original: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skinNum}.jpg`,
                thumbnail: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_${skinNum}.jpg`,
                description: skin.name
            }
        }) || []
    )
}

export default getSkinImages
