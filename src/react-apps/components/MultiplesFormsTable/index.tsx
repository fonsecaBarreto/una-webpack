import React, { ReactNode, useEffect, useState, useContext, FunctionComponent} from 'react'
import './style.css'
import { RiErrorWarningFill } from 'react-icons/ri'
import globalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig } from 'fck-react-dialog'
import { MdOpenInNew } from 'react-icons/md'
import { SchemaValidator, Validator } from 'fck-schema-validator'


export namespace MultiplesFormsTable {
    export type Params = {
        dto: any,
        dto_schema: SchemaValidator.Schema,
        headers: string[],
        onRowAction: (line: number, payload: any) => void
    }
    export type Error ={
        line: number,
        params: any[]
    }
}

const validator = new Validator();

export namespace RenderRows{
    export type Params = {
        columns: number, 
        line: number, 
        errors: Record<string, any>, 
        data: any,
        onInput: ( name: string, line:number, value: any) => void
        onRowAction: ( line:number, payload: any) => void
    }
}

const RenderRows: FunctionComponent<RenderRows.Params> = ({ columns, line, data, errors ={}, onInput, onRowAction }) => {  
    var names = Object.keys(data)
    return(
        <React.Fragment>
            <button className={`csv-reader-table-frame-action-btn ${errors.length > 0 ? "table-warning": ""}` } onClick={()=>onRowAction(line,{})}> 
                { Object.keys(errors).length > 0 ?   <RiErrorWarningFill/> : <MdOpenInNew/>  }
            </button>
            {   [...Array(columns)].map((_:any, i: number)=>{
                var name = names[i]
                let error = errors[name]
                var row_data = data[name]
                return (
                    <div className='csv-reader-table-frame-content-cell' key={i}>
                        <div className={`csv-reader-table-frame-column ${error ? "table-warning" : ""}`}>   
                            <input value={row_data} onInput={ (e: any) => onInput( name, line, e.target.value) }></input>
                        </div> 
                    </div>
                )
            })}
        </React.Fragment>)
}

const RenderHeaders= ({ headers }:{headers: string[]}) => {   
    return ( <React.Fragment>
                <span> </span>
                { headers.map((h: any, i: number)=> ( <div className='csv-reader-table-frame-content-cell' key={i}> { h } </div> ))}
            </React.Fragment> )
}

export const MultiplesFormsTable: React.FunctionComponent<MultiplesFormsTable.Params> = ({ dto, dto_schema, headers, onRowAction }) =>{
  
    const [ dataList, setDataList ] = useState<any[]>([])
    const [ errors, setErrors ] = useState<MultiplesFormsTable.Error[]>([])

    useEffect(()=>{  if(dto) handleEntry(dto); },[dto])

    const handleInputs =(name: string, line: number, value: any) =>{

        console.log(name, line, value)
        setDataList((prev: any)=>{
            var prev_data: any[] = [ ...prev];
            prev_data[line][name]=value 
            return (prev_data )
        })
    }

    const handleEntry = async (entry: any[]) =>{
        await Promise.all( (entry).map( async (p: any, i :number)=>{
            const errs = await validator.validate(dto_schema, p)
            if(errs){ setErrors( (prev: any ) => [ ...prev, { line: i, params: errs } ] ) }
        }))   
        setDataList(entry) /* O objeto sera sanitizado por referencia mas o UseState precisa ser atualicado */
    }

    const lineHaError =(errors: any, line: number) =>{
        if(errors.length > 0 ){
            const hasError = errors.find( (e: MultiplesFormsTable.Error) =>e.line === line);
            if(hasError) return hasError.params ?? {}
        }
        return []
    }

    useEffect(()=>{
        console.log("data-list", dataList)
    },[dataList])
    return (
        <div className='csv-reader-table-frame'>
           <section className='csv-reader-table-frame-content' style={{ gridTemplateColumns: `auto repeat(${headers.length}, 1fr)`}}>
                <RenderHeaders headers={headers}></RenderHeaders>
                {dataList.map((data: any, i: number)=>{
                    let line = i;
                    let lineErrors = lineHaError(errors, i);
                    return <RenderRows columns={headers.length} key={i} line={line} errors={lineErrors} data={data} onInput={handleInputs} onRowAction={onRowAction}></RenderRows>
                })}
           </section>
        </div>
    )
}

export default MultiplesFormsTable

