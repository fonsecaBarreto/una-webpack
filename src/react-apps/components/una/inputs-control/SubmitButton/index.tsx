import React from 'react'
import './style.css'
export namespace UnaSubmitButton {
    export type Params = {
        children?: React.ReactNode, 
        light?: boolean,
        onClick?: () => unknown,
        className?:string
    }
}

export const UnaSubmitButton: React.FunctionComponent<UnaSubmitButton.Params>  = ({children, light, onClick, className}) =>{

    const handleSubtmit = () =>{
        onClick && onClick();
    }
    return (
        <button onClick={handleSubtmit} className={`una-submit-form-button ${light ? "light" : ""} ${className ?? ""}`} > {children} </button>
    )
}

export default UnaSubmitButton