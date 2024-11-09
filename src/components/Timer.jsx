import React, { useEffect, useRef, useState } from 'react'
import './Timer.css'
import { ANIMEDORO_TIME } from './TimerContainer'

const TIMER_STATES = { ACTIVE: "active", PAUSED: "paused", FINISHED: 'finished' }

const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0')
    const seconds = (totalSeconds % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
}

const stopSound = (sound) => {
    sound.loop = false
    sound.pause()
}

function Timer({ initialSeconds, title, handleChildTimerFinish, setSecondsLocalStorage, resetMainTimer, sound, runOnLoad }) {
    const [seconds, setSeconds] = useState(initialSeconds)
    const [timerState, setTimerState] = useState(TIMER_STATES.PAUSED)
    const timerRef = useRef(null)

    useEffect(() => {
        if (runOnLoad) {
            setTimerState(TIMER_STATES.ACTIVE)
        }
        return () => {
            stopSound(sound)
            clearInterval(timerRef.current)
        }
    }, [])

    useEffect(() => {
        if (timerState === TIMER_STATES.FINISHED) {
            sound.loop = true
            sound.currentTime = 0
            sound.play()
        }
        else if (timerState === TIMER_STATES.ACTIVE) {
            stopSound(sound)
            if (timerRef.current === null) {
                timerRef.current = setInterval(() => {
                    setSeconds(prev => {
                        if (setSecondsLocalStorage) {
                            setSecondsLocalStorage(prev - 1)
                        }
                        return prev - 1
                    })
                }, 1000)
            }
        }
        else if (timerState === TIMER_STATES.PAUSED) {
            stopSound(sound)
            if (timerRef.current !== null) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
    }, [timerState])

    useEffect(() => {
        if (seconds === 0) {
            clearInterval(timerRef.current)
            timerRef.current = null
            setTimerState(TIMER_STATES.FINISHED)
        }
    }, [seconds])

    const handleStart = () => {
        setTimerState(TIMER_STATES.ACTIVE)
    }

    const handlePause = () => {
        setTimerState(TIMER_STATES.PAUSED)
    }

    const buttonFunction = () => {
        if (timerState === TIMER_STATES.PAUSED) {
            return handleStart
        } else if (timerState === TIMER_STATES.FINISHED) {
            return () => {
                handleChildTimerFinish()
                setSeconds(initialSeconds)
                setTimerState(TIMER_STATES.PAUSED)
            }
        } else if (timerState === TIMER_STATES.ACTIVE) {
            return handlePause
        }
    }

    const buttonText = () => {
        if (timerState === TIMER_STATES.PAUSED) {
            return 'Start'
        } else if (timerState === TIMER_STATES.FINISHED) {
            return 'Next'
        } else {
            return 'Pause'
        }
    }

    return (
        <div className={`${timerState} timer-section`}>
            <p className='title'>{title}</p>
            <p className='timer-display'>{formatTime(seconds)}</p>
            <div className='button-group'>
                {
                    (setSecondsLocalStorage === undefined || timerState !== TIMER_STATES.FINISHED) &&
                    (<button className='button' onClick={buttonFunction()}>
                        {buttonText()}
                    </button>)
                }
                {
                    resetMainTimer && (
                        <button className='button'
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    resetMainTimer()
                                    handleStart()
                                    setSeconds(ANIMEDORO_TIME)
                                }
                            }}>Reset</button>
                    )
                }
            </div>
        </div>
    )
}

export default Timer