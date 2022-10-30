import React from 'react'
import './style.css'

export namespace InputWrapperType {
    export type Params = {
        children: React.ReactNode, 
        className?:string,
        error?:string, 
        label?:string, 
        fill?: boolean,
        forceFocus?: boolean,
        floatLabel?: boolean
    }
}

export const InputWrapper: React.FunctionComponent<InputWrapperType.Params> = (
    {children, label, error, className, fill=true, forceFocus= false, floatLabel= false })=> {
    return (
    <div className={`input-wrapper  ${floatLabel ? "float-label": ""}${error ? "warning" : ''} ${fill ? "w100": ""} ${className} `}>
        { label ? <label className={`${ forceFocus ? "top-label": ""}`}>{label}</label> : <span/>} 
        {children}
        { error && <span className="form-error">
            {error}
        </span>
        }
    </div>)
}

export default InputWrapper