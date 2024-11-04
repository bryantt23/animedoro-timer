import React, { useEffect, useRef, useState } from 'react'
import './Timer.css'
import { ANIMEDORO_TIME } from './TimerContainer'

const TIMER_STATES = { ACTIVE: "active", PAUSED: "paused", FINISHED: 'finished' }

const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0')
    const seconds = (totalSeconds % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
}

function Timer({ initialSeconds, title, handleChildTimerFinish, setSecondsLocalStorage, resetMainTimer, sound }) {
    const [seconds, setSeconds] = useState(initialSeconds)
    const [timerState, setTimerState] = useState(TIMER_STATES.PAUSED)
    const timerRef = useRef(null)

    useEffect(() => {
        return () => {
            sound.loop = false
            sound.pause()
            clearInterval(timerRef.current)
        }
    }, [])

    useEffect(() => {
        if (timerState === TIMER_STATES.FINISHED) {
            sound.loop = true
            sound.play()
        }
        else {
            sound.loop = false
            sound.pause()
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
        if (timerRef.current === null) {
            timerRef.current = setInterval(() => {
                setSeconds(prev => {
                    setTimerState(TIMER_STATES.ACTIVE)
                    if (setSecondsLocalStorage) {
                        setSecondsLocalStorage(prev - 1)
                    }
                    return prev - 1
                })
            }, 1000)
        }
    }

    const handlePause = () => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current)
            timerRef.current = null
            setTimerState(TIMER_STATES.PAUSED)
        }
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
                <button className='button' onClick={buttonFunction()}>
                    {buttonText()}
                </button>
                {
                    resetMainTimer && (
                        <button className='button'
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    resetMainTimer()
                                    handlePause()
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