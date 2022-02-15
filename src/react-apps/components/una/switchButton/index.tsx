import React, { ReactNode, useEffect, useState } from 'react'
import './style.css'

export namespace SwitchButton {
    export type Params = {
        value: number,
        onInput: (e: any) => void,
        children: ReactNode,
        fill?:boolean
    }
}

export const SwitchButton: React.FunctionComponent<SwitchButton.Params> = ({value, onInput, children, fill=false}) =>{
    return (
        <div className={`una-switch-button ${fill ? 'w100' : ''}`}>
            { 
                React.Children.map(children, (x,i) =>(
                    <button className={`${value === i ? "usb-selected" : ""} `} onClick={()=>onInput(i)}> {x} </button>
                ))
            }
        </div>
    )
}

export default SwitchButton