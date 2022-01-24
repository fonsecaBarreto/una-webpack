import React from 'react'
import './style.css'
import { FaBars }  from 'react-icons/fa'

export const ToggleButton: React.FunctionComponent<any>  = ({ onClick,desktop }) => {
    return (
        <button className={`common-toggle-button  ${desktop? 'toggle-on-desktop': ''}`} onClick={onClick && onClick}> <FaBars></FaBars> </button>
    )
}

export default ToggleButton