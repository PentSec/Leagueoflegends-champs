import React, { useState, memo } from 'react'
import { Spinner } from '@nextui-org/react'
import { useRef } from 'react'

const VideoAbilities = memo(({ videoUrl, name }) => {
    const [loading, setLoading] = useState(true)
    const videoRef = useRef(null)

    const handleVideoLoad = () => {
        setLoading(false)
    }

    return (
        <>
            {loading && <Spinner label={`Loading ${name} video...`} />}
            <video
                width="100%"
                className={`mt-2 rounded-lg ${
                    loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'
                }`}
                autoPlay
                loop
                onLoadedData={handleVideoLoad}
            >
                <source src={videoUrl} type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </>
    )
})

export default VideoAbilities
