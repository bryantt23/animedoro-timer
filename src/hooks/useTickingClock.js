import React, { useState, useEffect } from 'react'
const ticking = new Audio('/animedoro-timer/ticking.mp3')

export function useTickingClock(shouldEnable = true) {
    const [isVolumeOn, setIsVolumeOn] = useState(false)


    const turnOffSound = () => {
        ticking.loop = false
        ticking.pause()
        setIsVolumeOn(false)
    }

    const turnOnSound = () => {
        ticking.loop = true
        ticking.currentTime = 0
        ticking.play()
        setIsVolumeOn(true)
    }

    useEffect(() => {
        if (!shouldEnable) {
            return
        }

        if (isVolumeOn) {
            turnOnSound()
        }
        else {
            turnOffSound()
        }

        return () => turnOffSound()
    }, [isVolumeOn, shouldEnable])

    if (!shouldEnable) {
        return {
            toggleSound: () => { },
            isVolumeOn,
            turnOffSound: () => { },
            turnOnSound: () => { },
        }
    }

    return {
        toggleSound: () => {
            setIsVolumeOn(prev => !prev)
        },
        isVolumeOn,
        turnOffSound,
        turnOnSound
    }
}