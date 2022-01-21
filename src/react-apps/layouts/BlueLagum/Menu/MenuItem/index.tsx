import React, { useEffect, useState } from 'react'
import './style.css'
import { useHistory } from 'react-router-dom'
import './style.css'

export namespace BlueLakeMenuItem {
    export type Config = { label: string, toDo: () => void | string, icon: any}
    export type Params = {
        config: Config
        selected: boolean,
        menuState: { show: boolean, toggle: Function}
    }
}

const MenuItem: React.FunctionComponent<BlueLakeMenuItem.Params> = ({ config, selected, menuState }) =>{

    const history = useHistory()
   
    const { label, icon, toDo } = config

    const handleClick = () => { 
        if(typeof toDo == "string") return history.push(toDo);
        return toDo()
    } 

    return (
    <li className={`common-menu-item ${selected ? 'selected' : ''}`} > 
    
        <span  className="common-menu-item-row" onClick={() => handleClick()} >
            <span className="common-menu-ico"> {icon && icon}  </span>
            <span> {label} </span>
        </span>

    </li>)
}

export default MenuItem