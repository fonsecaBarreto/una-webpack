import React from 'react'
import './style.css'

export const ToggleButton: React.FunctionComponent<any>  = ({ onClick,desktop }) => {
    return (
        <button className={`common-toggle-button  ${desktop? 'toggle-on-desktop': ''}`} onClick={onClick && onClick}> 	&equiv; </button>
    )
}

export default ToggleButton