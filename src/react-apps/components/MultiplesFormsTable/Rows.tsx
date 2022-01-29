import React, { FunctionComponent } from "react"
import { MdOpenInNew } from "react-icons/md"
import { RiErrorWarningFill } from "react-icons/ri"

export namespace MultiplesFormsTableRow{
    export type InputHandler = ( name: string, line:number, value: any) => void
    export type EntryHandler = ( line: number, value: any ) => void
    export type ActionHandler =  ( line:number, payload: { errors: Record<string, any>, data: any, onEntry: EntryHandler } ) => void
    export type Params = {
        headers:  {label: string, value: string}[], 
        line: number, 
        errors: Record<string, any>, 
        data: any,
        onInput: InputHandler
        onEntry: EntryHandler
        onRowAction:ActionHandler
    }
}

export const RenderRows: FunctionComponent<MultiplesFormsTableRow.Params> = ({ headers, line, data, errors ={}, onInput, onRowAction, onEntry}) => {  
    return(
        <React.Fragment>
            <button className={`csv-reader-table-frame-action-btn ${errors.length > 0 ? "table-warning": ""}` } onClick={()=> onRowAction(line,{ errors, data, onEntry  })}> 
                { Object.keys(errors).length > 0 ?   <RiErrorWarningFill/> : <MdOpenInNew/>  }
            </button>
            {   headers.map((h:any, i: number)=>{
                let error = errors[h.value]
                var value = data[h.value]
                return (
                    <div className='csv-reader-table-frame-content-cell' key={i}>
                        <div className={`csv-reader-table-frame-column ${error ? "table-warning" : ""}`}>   
                            <input value={value} onInput={ (e: any) => onInput( h.value, line, e.target.value) }></input>
                            {JSON.stringify(error)}
                        </div> 
                    </div>
                )
            })}
        </React.Fragment>)
}


export default RenderRows