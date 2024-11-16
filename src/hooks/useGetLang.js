import { useEffect, useState } from 'react'

function useGetLang() {
    const [languages, setLanguages] = useState([])
    useEffect(() => {
        const fetchLang = async () => {
            try {
                const response = await fetch(
                    'https://ddragon.leagueoflegends.com/cdn/languages.json'
                )
                if (response.status !== 200) {
                    throw new Error('Failed to fetch language')
                }
                const data = await response.json()
                setLanguages(data)
            } catch (error) {
                console.error('Error fetching language:', error)
            }
        }
        fetchLang()
    }, [])

    return { languages }
}

export default useGetLang
