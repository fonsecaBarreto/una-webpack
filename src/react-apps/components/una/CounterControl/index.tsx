import React from 'react'
import './style.css'
export namespace CounterControl {
    export type Params = {
        onInput?:  (n: number) => unknown,
        value: number
    }
}

export const CounterControl: React.FunctionComponent<CounterControl.Params>  = ({onInput, value}) =>{
    return (
        <div>
            <button onClick={()=>onInput && onInput(-1)}>-</button>
            <span> {value} </span>
            <button onClick={()=>onInput && onInput(1)}>+</button>
        </div>
    )
}

export default CounterControl