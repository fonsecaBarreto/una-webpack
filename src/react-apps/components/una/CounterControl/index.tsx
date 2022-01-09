import React from 'react'
import './style.css'
export namespace CounterControl {
    export type Params = {
        onInput?:  (n: number) => unknown,
        value: number,
        altType?: boolean
    }
}

export const CounterControl: React.FunctionComponent<CounterControl.Params>  = ({onInput, value, altType = false}) =>{
    return (
        <div className={`una-counter-control ${altType ? 'altType' : ""}`}>
            <button onClick={()=>onInput && onInput(-1)}>-</button>
            <span> {value} </span>
            <button onClick={()=>onInput && onInput(1)}>+</button>
        </div>
    )
}

export default CounterControl