import React, { FC, ReactNode, useState } from 'react'
import './style.css'

export namespace DropDown {
    export type Options = {
        label: string,
        value: string
    }
    export type Params = {
        children : ReactNode
        options?: Options[],
        onAction: Function,
        className: string
    }
}

export const DropDown: FC<DropDown.Params> =  ({ children, options, onAction, className }) =>{

    const [active, setActive ] = useState(false)
    return (
        <div className={`una-drop-down-container ${className}`} onClick={() => setActive(!active)}  onMouseLeave={()=>setActive(false)}>  
            { children }
            <div className={`una-drop-down-content ${active ? 'show' : ''}`}>
                { options && options.map((o: any, i:number) =>{
                    return <button key={i} onClick={()=>onAction(o.value)}>{o.label}</button>
                })}
            </div>
        </div>
    )
}

export default DropDown