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
    const localInitialSeconds = JSON.parse(localStorage.getItem('seconds'))

    const toggleWorkRestState = () => {
        if (timerState === TIMER_STATES.WORK) {
            setTimerState(TIMER_STATES.REST)
        }
        else {
            setTimerState(TIMER_STATES.WORK)
        }
    }

    const handleChildTimerFinish = () => {
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
                {timerState === TIMER_STATES.WORK ?
                    <Timer
                        key="work"
                        initialSeconds={WORK_TIME}
                        title={"Doing"}
                        handleChildTimerFinish={handleChildTimerFinish}
                        sound={rooster}
                    />
                    :
                    <Timer
                        key="rest"
                        initialSeconds={REST_TIME}
                        title={"Being"}
                        handleChildTimerFinish={handleChildTimerFinish}
                        sound={smallGong}
                    />
                }
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