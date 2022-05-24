import React, { FC, ReactNode, useState } from 'react'
import './style.css'

export namespace DropDown {
    export type Options = {
        label: string,
        value: string,
        icon?: any
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
                    let { icon, label } = o
                    return (<button key={i} onClick={()=>onAction(o.value)}>
                        {icon &&  <span className='udw-icon'>  {icon} </span>  } 
                        <span className='udw-label'> {label}</span>
                    </button>)
                })}
            </div>
        </div>
    )
}

export default DropDown