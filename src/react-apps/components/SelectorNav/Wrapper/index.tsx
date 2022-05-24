import React, { ReactNode, useEffect, useState } from 'react'
import './style.css'

export namespace SelectorNavWrapper {
    export type Item  = { value: string, label: string, parent_id?:string }
    export interface Params {
        title:string,
        icon?: any,
        open_initial?: boolean,
        children: ReactNode,
        showCurtain?:boolean
    }
}   

export const SelectorNavWrapper: React.FunctionComponent<SelectorNavWrapper.Params> =  ({  title, icon, children, open_initial=true,showCurtain=true }) =>{
    const [ open, setOpen ] = useState(open_initial);
    return (
        <nav className="nav-selector-wrapper">
            <div onClick={()=>setOpen(!open)} 
                className="nav-selector-wrapper-title"> { showCurtain && ( <span className={`nvsw-icons ${ !open ?"down" : "up"}`}>&lsaquo;</span>)}  {icon && icon} { title } </div>
            <div className={`nav-selector-wrapper-body ${open ? 'open' : ''}`}>
                { children }
            </div>
        </nav>
    )
}

export default SelectorNavWrapper
