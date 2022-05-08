import React, { useEffect, useState } from 'react'
import './style.css'
import { useHistory } from 'react-router-dom'
import './style.css'
import { BlueLakeMenu } from '../..'


export namespace BlueLakeMenuItem {
    export type Params = {
        config: BlueLakeMenu.Item
    }
}

const MenuItem: React.FunctionComponent<BlueLakeMenuItem.Params> = ({ config }) =>{

    const [expand, setExpand] = useState(false)
    const history = useHistory()
   
    const { label, icon, toDo, childs } = config

    const handleClick = () => { 
        if(!toDo && childs && childs.length > 0 ) return setExpand(prev=>!prev)
        if(typeof toDo == "string") return history.push(toDo);
        return toDo()
    } 

    return (
    <li className={`blue-lake-aside-overflow-menu-item`} > 
        <div onClick={() => handleClick()} >
            <span className="common-menu-ico"> {icon && icon}  </span>
            <span> {label} </span>
        </div>
        {(childs) &&
            <ul className={`${expand ? "expand" : ""}`} >
                {
                    childs.map((c:any, i)=>  ( <MenuItem key={i} config={c}></MenuItem> ) )
                }
            </ul>
        }
    </li>)
}

export default MenuItem