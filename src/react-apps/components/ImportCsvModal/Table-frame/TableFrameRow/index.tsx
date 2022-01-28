import React from 'react'
import TableFrame from '..'
import "./style.css"

import { RiErrorWarningFill } from 'react-icons/ri'
export namespace TableFrameColumn{
    export type Params = {
        value: any,
        name: string,
        onInput: ( name: string, value: any) => void
        error: any
    }
}
export const TableFrameColumn: React.FunctionComponent<TableFrameColumn.Params> = ({name, value, onInput, error}) =>{

    const handleInputs =(e: any) =>{
        onInput(name, e.target.value)
    }

    return (
        <td>   
            <input value={value} onInput={handleInputs}></input>
        </td>
    )
}

export namespace TableFrameRow{
    export type Params = {
        dto: TableFrame.ProdutoDto,
        errors: any[],
        onInput: ( name: string, line: number, value: any) => void
        line: number
    }
}

export const TableFrameRow: React.FunctionComponent<TableFrameRow.Params> = ({dto, errors, line, onInput}) =>{
    return (

        <React.Fragment>
            { Object.keys(errors).length > 0 && <span className='csv-reader-table-frame-row-warning'><RiErrorWarningFill/> </span> }
            <tr>
                {
                    Object.keys(dto).map((name: any, j: number) =>{
                        var data:any = {...dto};
                        return (
                            <TableFrameColumn error={errors[name]} value={ data[name]} key={j} name={name} onInput={(name, value)=>onInput(name, line, value)} ></TableFrameColumn>
                            )
                        })
                    }
            </tr>
        </React.Fragment>
    )
}






export default TableFrameRow