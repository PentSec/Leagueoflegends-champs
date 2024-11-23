import { useMemo } from 'react'

function useChampionVoice(championVoice) {
    const voiceChamp = useMemo(() => {
        if (!championVoice) return null
        const audio = new Audio(championVoice)
        audio.load()
        return audio
    }, [championVoice])

    return voiceChamp
}

export default useChampionVoice
