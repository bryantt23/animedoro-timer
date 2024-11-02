import React, { useEffect, useRef, useState } from 'react'
import Timer from './Timer'

const TIMER_STATES = { WORK: "work", REST: "rest" }

function TimerContainer() {
    const [timerState, setTimerState] = useState(TIMER_STATES.WORK)
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
        localStorage.removeItem('seconds')
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ flex: '1', backgroundColor: 'lightgreen' }}>
                <p>current state {JSON.stringify(timerState)}</p>
                <p>Toggle <button onClick={toggleWorkRestState}>{timerState}</button></p>
                {timerState === TIMER_STATES.WORK ?
                    <Timer
                        key="work"
                        initialSeconds={3}
                        title={"Work"}
                        handleChildTimerFinish={handleChildTimerFinish}
                    />
                    :
                    <Timer
                        key="rest"
                        initialSeconds={2}
                        title={"Rest"}
                        handleChildTimerFinish={handleChildTimerFinish}
                    />
                }
            </div>
            <div style={{ flex: '1', backgroundColor: 'lightblue', height: '100%' }}>
                <Timer
                    initialSeconds={localInitialSeconds || 5}
                    title={"Hardcore"}
                    handleChildTimerFinish={mainTimerHandleFinish}
                    setSecondsLocalStorage={setSecondsLocalStorage}
                    resetMainTimer={resetMainTimer}
                />
            </div>
        </div>
    )
}

export default TimerContainer