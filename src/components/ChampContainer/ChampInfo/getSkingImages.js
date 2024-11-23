const getSkinImages = (champion) => {
    return (
        champion?.skins?.map((skin) => ({
            original: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${skin.num}.jpg`,
            thumbnail: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_${skin.num}.jpg`,
            description: skin.name
        })) || []
    )
}

export default getSkinImages
