import React, { ReactNode, useEffect, useState } from 'react'
import './style.css'

export namespace SwitchButton {
    export type Params = {
        onInput: (e: any) => void,
        children: ReactNode
    }
}

export const SwitchButton: React.FunctionComponent<SwitchButton.Params> = ({onInput, children}) =>{
    const [ side, setSide ] = useState(0)
    useEffect(()=>{onInput(side)},[side])
    return (
        <div className='una-switch-button'>
            { 
                React.Children.map(children, (x,i) =>(
                    <button className={`${side === i ? "usb-selected" : ""} `} onClick={()=>setSide(i)}> {x} </button>
                ))
            }
        </div>
    )
}

export default SwitchButton