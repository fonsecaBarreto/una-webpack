import React from 'react'
import './style.css'
export namespace UnaSubmitButton {
    export type Params = {
        children?: React.ReactNode, 
        light?: boolean,
        onClick?:  () => unknown
    }
}

export const UnaSubmitButton: React.FunctionComponent<UnaSubmitButton.Params>  = ({children, light, onClick}) =>{
    return (
        <button onClick={onClick} className={`una-submit-form-button ${light ? "light" : ""}`} > {children} </button>
    )
}

export default UnaSubmitButton