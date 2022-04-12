import React, { useEffect, useState } from 'react'
import './style.css'
import { useHistory } from 'react-router-dom'
import './style.css'
import { MenuItemConfig } from '../../MENU-TREE'

export namespace BlueLakeMenuItem {
    export type Config = MenuItemConfig
    export type Params = {
        config: Config
        selected: boolean,
    }
}

const MenuItem: React.FunctionComponent<BlueLakeMenuItem.Params> = ({ config, selected }) =>{

    const [expand, setExpand] = useState(true)
    const history = useHistory()
   
    const { label, icon, toDo, className } = config

    const handleClick = () => { 
        if(typeof toDo == "string") return history.push(toDo);
        return toDo()
    } 

    return (
    <li className={`common-menu-item ${selected ? 'selected' : '' } ${className ? className : ""}`} > 
    
        <span className="common-menu-item-row" onClick={() => handleClick()} >
            <span className="common-menu-ico"> {icon && icon}  </span>
            <span> {label} </span>
        </span>
        <span className={`common-menu-item-row-body ${expand ? "expand" : ""}`} >
          {/*   <MenuItem config={{icon: null, label:"teste",toDo: () =>{} }} selected={false}></MenuItem> */}
        </span>

    </li>)
}

export default MenuItem