import { useState, useEffect } from 'react'
let count

function useGetLanesRates() {
    const [lanesRates, setLanesRates] = useState(null)
    const [loadingLane, setLoadingLane] = useState(true)

    useEffect(() => {
        count = count ? count + 1 : 1
        console.log('count', count)
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
                    setLanesRates(parsedJson)
                } else {
                    console.error('No se encontró JSON en el script.')
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error)
            } finally {
                setLoadingLane(false)
            }
        }

        fetchData()
    }, [])

    return { lanesRates, loadingLane }
}

export default useGetLanesRates
