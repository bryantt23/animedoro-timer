import React, { useEffect, useRef, useState } from 'react'
import './Timer.css'

const TIMER_STATES = { ACTIVE: "active", PAUSED: "paused", FINISHED: 'finished' }

function Timer({ initialSeconds }) {
    const localInitialSeconds = JSON.parse(localStorage.getItem('seconds')) || initialSeconds
    const [seconds, setSeconds] = useState(localInitialSeconds)
    const [timerState, setTimerState] = useState(TIMER_STATES.PAUSED)
    const timerRef = useRef(null)
    const rooster = new Audio('../../public/rooster.wav')


    useEffect(() => {
        return () => {
            clearInterval(timerRef.current)
        }
    }, [])

    const handleStart = () => {
        if (timerRef.current === null) {
            timerRef.current = setInterval(() => {
                setSeconds(prev => {
                    if (prev === 0) {
                        clearInterval(timerRef.current)
                        timerRef.current = null
                        setTimerState(TIMER_STATES.FINISHED)
                        localStorage.removeItem('seconds')
                        rooster.play()
                        return "done"
                    }
                    else {
                        localStorage.setItem('seconds', prev - 1)
                        setTimerState(TIMER_STATES.ACTIVE)
                        return prev - 1
                    }
                })
            }, 1000)
        }
    }

    return (
        <div className={timerState}>
            <h1>    {timerState}</h1>
            <p>{seconds}</p>
            <button onClick={handleStart}>Start</button>
        </div>
    )
}

export default Timer