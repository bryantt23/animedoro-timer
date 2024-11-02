import React, { useEffect, useRef, useState } from 'react'
import Timer from './Timer'

const TIMER_STATES = { WORK: "work", REST: "rest" }

function TimerContainer() {
    const [timerState, setTimerState] = useState(TIMER_STATES.WORK)
    const handleChildTimerFinish = () => {
        if (timerState === TIMER_STATES.WORK) {
            setTimerState(TIMER_STATES.REST)
        }
        else {
            setTimerState(TIMER_STATES.WORK)
        }
    }

    return (
        <div>
            <p>current state {JSON.stringify(timerState)}</p>
            {timerState === TIMER_STATES.WORK ?
                <Timer initialSeconds={3} title={"Work"} handleChildTimerFinish={handleChildTimerFinish} />
                :
                <Timer initialSeconds={2} title={"Rest"} handleChildTimerFinish={handleChildTimerFinish} />
            }
        </div>
    )
}

export default TimerContainer