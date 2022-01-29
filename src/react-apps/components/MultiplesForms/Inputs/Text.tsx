import React from 'react'
import { StateAdapter } from 'fck-react-input-controls/lib/Controls'
import './style.css'

export namespace MultiplesFormTextInput {
    export type Params = {
        state: StateAdapter.Handler,
        name: string, 
        placeHolder?: string
        onDoubleClick?: (e:any) => void 
    }
}

export const MultiplesFormTextInput: React.FunctionComponent<MultiplesFormTextInput.Params> = ({ name, state, onDoubleClick, placeHolder}) =>{
    var value = state.data.get[name]
    return (
        <React.Fragment >
           <input placeholder={placeHolder ?? ""} value={value} onInput={(e: any)=>state.data.onInput(name, e.target.value ,false)}></input> 
        </React.Fragment>
    )
}

export default MultiplesFormTextInput