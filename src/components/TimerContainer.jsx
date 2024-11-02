import React, { useEffect, useRef, useState } from 'react'
import Timer from './Timer'

const TIMER_STATES = { WORK: "work", REST: "rest" }

function TimerContainer() {
    const [timerState, setTimerState] = useState(TIMER_STATES.WORK)

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

    return (
        <div>
            <p>current state {JSON.stringify(timerState)}</p>
            <p>Toggle <button onClick={toggleWorkRestState}>{timerState}</button></p>
            {timerState === TIMER_STATES.WORK ?
                <Timer key="work" initialSeconds={3} title={"Work"} handleChildTimerFinish={handleChildTimerFinish} />
                :
                <Timer key="rest" initialSeconds={2} title={"Rest"} handleChildTimerFinish={handleChildTimerFinish} />
            }
        </div>
    )
}

export default TimerContainer