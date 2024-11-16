import { useEffect, useState } from 'react'

function useGetVersion() {
    const [versions, setVersions] = useState([])
    useEffect(() => {
        const fetchVersion = async () => {
            try {
                const response = await fetch(
                    'https://ddragon.leagueoflegends.com/api/versions.json'
                )
                if (response.status !== 200) {
                    throw new Error('Failed to fetch version')
                }
                const data = await response.json()
                setVersions(data)
            } catch (error) {
                console.error('Error fetching version:', error)
            }
        }
        fetchVersion()
    }, [])

    return { versions }
}

export default useGetVersion
