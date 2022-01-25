import React, { ReactNode, useEffect, useState } from 'react'
import './style.css'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

export namespace SelectorNavWrapper {
    export type Item  = { value: string, label: string, parent_id?:string }
    export interface Params {
        title:string,
        open_initial?: boolean,
        children: ReactNode
    }
}   

export const SelectorNavWrapper: React.FunctionComponent<SelectorNavWrapper.Params> =  ({  title, children, open_initial=true }) =>{
    const [ open, setOpen ] = useState(open_initial);
    return (
        <nav className="nav-selector-wrapper">
            <div onClick={()=>setOpen(!open)} className="nav-selector-wrapper-title">{ !open ? <MdExpandMore/> : <MdExpandLess/>}{ title } </div>
            <div className={`nav-selector-wrapper-body ${open ? 'open' : ''}`}>
                { children }
            </div>
        </nav>
    )
}

export default SelectorNavWrapper
