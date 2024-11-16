import { useEffect, useState } from 'react'

function useGetVersion() {
    const [versions, setVersions] = useState([])
    const [isLoadingVersion, setIsLoadingVersion] = useState(false)
    const [errorVersion, setErrorVersion] = useState(null)

    useEffect(() => {
        const fetchVersion = async () => {
            try {
                setIsLoadingVersion(true)
                const response = await fetch(
                    'https://ddragon.leagueoflegends.com/api/versions.json'
                )
                if (response.status !== 200) {
                    throw new Error('Failed to fetch version')
                }
                const data = await response.json()
                setVersions(data)
                console.log(`versions useGetVersion`, data)
            } catch (error) {
                console.error('Error fetching version:', error)
                setErrorVersion(error)
            } finally {
                setIsLoadingVersion(false)
            }
        }
        fetchVersion()
    }, [])

    return { versions, isLoadingVersion, errorVersion }
}

export default useGetVersion
