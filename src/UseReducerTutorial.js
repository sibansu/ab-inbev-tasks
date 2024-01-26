import React, { useReducer } from 'react'
import { reducer } from './reducer'
function UseReducerTutorial() {

    const [state, dispatch] = useReducer(reducer, { count: 0, showText: true })
    return (
        <div>
            <button
                onClick={() => {
                    dispatch({ type: "increment" });
                    dispatch({ type: 'toggleShowText' })
                }}
            >
                Toggle
            </button>
            <h1>Count: {state.count}</h1>
            {state.showText && (
                <span>ShowText is enabled</span>
            )}
        </div>
    )
}

export default UseReducerTutorial