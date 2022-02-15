import React, { ReactNode, useEffect, useState } from 'react'
import './style.css'

export namespace SwitchButton {
    export type Params = {
        value: number,
        onInput: (e: any) => void,
        children: ReactNode
    }
}

export const SwitchButton: React.FunctionComponent<SwitchButton.Params> = ({value, onInput, children}) =>{
    return (
        <div className='una-switch-button'>
            { 
                React.Children.map(children, (x,i) =>(
                    <button className={`${value === i ? "usb-selected" : ""} `} onClick={()=>onInput(i)}> {x} </button>
                ))
            }
        </div>
    )
}

export default SwitchButton