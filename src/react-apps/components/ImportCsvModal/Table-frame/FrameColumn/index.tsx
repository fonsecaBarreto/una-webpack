import React from 'react'
import "./style.css"

export namespace TableFrameColumn{
    export type Params = {
        value: any,
        name: string,
        line: number, 
        onInput: ( name: string, line:number, value: any) => void
        error: any
    }
}

export const TableFrameColumn: React.FunctionComponent<TableFrameColumn.Params> = ({line, name, value, onInput, error}) =>{

    const handleInputs =(e: any) =>{ onInput( name, line, e.target.value)  }

    return (
        <div className={`csv-reader-table-frame-column ${error ? "table-warning" : ""}`}>   
            <input value={value} onInput={handleInputs}></input>
        </div>
    )
}

export default TableFrameColumn

