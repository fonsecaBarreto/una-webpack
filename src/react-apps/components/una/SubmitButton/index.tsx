import React from 'react'
/*  import './style.css'  */

export namespace UnaSubmitButton {
    export type Params = {
        children?: React.ReactNode, 
       /*  onClick?:  () => React.MouseEventHandler<HTMLButtonElement> */
    }
}

export const UnaSubmitButton: React.FunctionComponent<UnaSubmitButton.Params>  = ({children}) =>{
    return (
        <button > {children} </button>
    )
}

export default UnaSubmitButton