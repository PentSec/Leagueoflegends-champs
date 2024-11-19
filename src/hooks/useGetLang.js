import { useEffect, useState } from 'react'

function useGetLang() {
    const [languages, setLanguages] = useState([])
    const [isLoadingLang, setIsLoadingLang] = useState(false)
    const [errorLang, setErrorLang] = useState(null)

    useEffect(() => {
        const fetchLang = async () => {
            try {
                setIsLoadingLang(true)
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
                setErrorLang(error)
            } finally {
                setIsLoadingLang(false)
            }
        }
        fetchLang()
    }, [])

    return { languages, isLoadingLang, errorLang }
}

export default useGetLang
