import React from 'react'
import './style.css'
import SelectInput  from './Select'
import { StateAdapter } from 'fck-react-input-controls/lib/Controls'
import { RiErrorWarningLine } from 'react-icons/ri'

export namespace TextInput {
    export type Params = {
        state: StateAdapter.Handler,
        name: string, 
        placeHolder?: string
        onDoubleClick?: (e:any) => void 
    }
}

export const TextInput: React.FunctionComponent<TextInput.Params> = ({ name, state, onDoubleClick, placeHolder}) =>{
    var value = state.data.get[name]
    return (
        <React.Fragment >
           <input placeholder={placeHolder ?? ""} value={value} onInput={(e: any)=>state.data.onInput(name, e.target.value ,false)}></input> 
        </React.Fragment>
    )
}

export const CellInput: React.FunctionComponent<any> = ({ error, type, state, name, list}) =>{
    return (
        <div className={`m-form-row-input ${error ? "error": ""}`} > 
            { 
                (type == "select")
                ? <SelectInput name={ name} state={state} list={list ?? []}></SelectInput> 
                : <TextInput state={state} name={ name} ></TextInput>
            }  
            { (error && type != "select") && <span className={`float-status-error`}> <RiErrorWarningLine/> </span> }
        </div>  
    )
}

export default CellInput