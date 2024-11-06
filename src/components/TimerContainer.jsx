import React, { useState } from 'react'
import Timer from './Timer'
import './TimerContainer.css'

const WORK_TIME = 15 * 60, REST_TIME = 90
export const ANIMEDORO_TIME = 60 * 60

const rooster = new Audio('/animedoro-timer/rooster.wav');
const smallGong = new Audio('/animedoro-timer/small-gong.mp3');
const largeGong = new Audio('/animedoro-timer/large-gong.mp3');

const TIMER_STATES = { WORK: "Do", REST: "Be" }

function TimerContainer() {
    const [timerState, setTimerState] = useState(TIMER_STATES.REST)
    const [runOnLoad, setRunOnLoad] = useState(false)
    const localInitialSeconds = JSON.parse(localStorage.getItem('seconds'))

    const toggleWorkRestState = () => {
        setRunOnLoad(true)
        if (timerState === TIMER_STATES.WORK) {
            setTimerState(TIMER_STATES.REST)
        }
        else {
            setTimerState(TIMER_STATES.WORK)
        }
    }

    const handleChildTimerFinish = () => {
        setRunOnLoad(true)
        toggleWorkRestState()
    }

    const mainTimerHandleFinish = () => {
        localStorage.removeItem('seconds')
    }

    const setSecondsLocalStorage = (seconds) => {
        localStorage.setItem('seconds', seconds)
    }

    const resetMainTimer = () => {
        largeGong.pause()
        localStorage.removeItem('seconds')
    }

    return (
        <div className='container'>
            <div className='toggle-section'>
                <button className='button' onClick={toggleWorkRestState}>Switch to {`${timerState === TIMER_STATES.REST ? 'Do' : 'Be'}`}ing</button>
            </div>
            <div className='timer-section'>
                <Timer
                    key={timerState === TIMER_STATES.WORK ? "work" : "rest"}
                    initialSeconds={timerState === TIMER_STATES.WORK ? WORK_TIME : REST_TIME}
                    title={timerState === TIMER_STATES.WORK ? "Doing" : "Being"}
                    handleChildTimerFinish={handleChildTimerFinish}
                    sound={timerState === TIMER_STATES.WORK ? rooster : smallGong}
                    runOnLoad={runOnLoad}
                />
            </div>
            <div className='timer-section'>
                <Timer
                    initialSeconds={localInitialSeconds || ANIMEDORO_TIME}
                    title={"Animedoro"}
                    handleChildTimerFinish={mainTimerHandleFinish}
                    setSecondsLocalStorage={setSecondsLocalStorage}
                    resetMainTimer={resetMainTimer}
                    sound={largeGong}
                />
            </div>
        </div>
    )
}

export default TimerContainer