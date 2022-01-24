import React, { useEffect, useState } from 'react'
import './style.css'
/* import { useWindowSize } from '../../../../components/utils/useWindowSize'
 */
const MenuItem = ({ config, selected, menuState, onClick }) =>{



    const { label, icon, to, childs } = config 
    
 /*    const [ isExpanded, setIsExpanded ] = useState(false)
    useEffect(()=>{
        if(menuState.show === false){ setIsExpanded(false) }
    },[menuState.show])  */

    const handleClick = (to) =>{
        onClick(to)
       /*  if(childs?.length > 1){
            if(menuState.show === false){ menuState.setShow(true) }
            setIsExpanded(!isExpanded)
        } */
    }

    return (
    <li className={`common-menu-item ${selected ? 'selected' : ''}`} > 
        <span  className="common-menu-item-row" onClick={() => handleClick(to, childs)} >
            <span className="common-menu-ico"> { icon && icon}  </span>
            <span> {label} </span>
        </span>
    </li>)
}

export default MenuItem