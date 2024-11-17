import { useState, useEffect } from 'react'

function useChampionData() {
    const [championData, setChampionData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const url =
                'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champion-statistics/global/default/rcp-fe-lol-champion-statistics.js'

            try {
                const response = await fetch(url)
                const scriptText = await response.text()
                const jsonMatch = scriptText.match(/JSON\.parse\('([^']*)'\)/)

                if (jsonMatch && jsonMatch[1]) {
                    const rawJson = jsonMatch[1]
                    const parsedJson = JSON.parse(rawJson)
                    setChampionData(parsedJson)
                } else {
                    console.error('No se encontró JSON en el script.')
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return { championData, loading }
}

export default useChampionData
