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
        menuState: any
    }
}

const MenuItem: React.FunctionComponent<BlueLakeMenuItem.Params> = ({ config, selected, menuState}) =>{

    const [expand, setExpand] = useState(false)
    const history = useHistory()
   
    const { label, icon, toDo, className, childs } = config

    const handleClick = () => { 
        if(!menuState.show) menuState.toggle();
        if(!toDo && childs.length > 0 ) return setExpand(prev=>!prev)
        if(typeof toDo == "string") return history.push(toDo);
        return toDo()
    } 

    return (
    <li className={`common-menu-item ${selected ? 'selected' : '' } ${className ? className : ""}`} > 
    
        <span className="common-menu-item-row" onClick={() => handleClick()} >
            <span className="common-menu-ico"> {icon && icon}  </span>
            <span> {label} </span>
        </span>
        {
            (childs) &&
            <span className={`common-menu-item-row-body ${expand ? "expand" : ""}`} >
                {
                    childs.map((c:any, i)=>{
                      return ( <MenuItem key={i} config={c} selected={false} menuState={menuState}></MenuItem> )
                    })
                }
            </span>
        }

    </li>)
}

export default MenuItem