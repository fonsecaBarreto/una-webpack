import React, { ReactNode, useEffect, useState, useContext, FunctionComponent} from 'react'
import './style.css'
import { RiErrorWarningFill } from 'react-icons/ri'

import { MdOpenInNew } from 'react-icons/md'
import { SchemaValidator, Validator } from 'fck-schema-validator'


export namespace MultiplesFormsTable {
    export type Params = {
        dto: any,
        dto_schema: SchemaValidator.Schema,
        headers: {label: string, value: string}[],
        onRowAction: (line: number, payload: any) => void
    }
    export type Error ={
        line: number,
        params: Record<string, any>[]
    }
}

const validator = new Validator();

export namespace RenderRows{

    export type InputHanlder = ( name: string, line:number, value: any) => void
    export type Params = {
        headers:  {label: string, value: string}[], 
        line: number, 
        errors: Record<string, any>, 
        data: any,
        onInput: InputHanlder
        onRowAction: ( line:number, payload: { errors: Record<string, any>, data: any, onInput: InputHanlder }) => void
    }
}

const RenderRows: FunctionComponent<RenderRows.Params> = ({ headers, line, data, errors ={}, onInput, onRowAction }) => {  
    return(
        <React.Fragment>
            <button className={`csv-reader-table-frame-action-btn ${errors.length > 0 ? "table-warning": ""}` } onClick={()=>onRowAction(line,{ errors, data, onInput })}> 
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

const RenderHeaders= ({ headers }:{headers: {label: string, value: string}[]}) => {   
    return ( <React.Fragment>
                <span> </span>
                { headers.map((h: any, i: number)=> ( <div className='csv-reader-table-frame-content-cell' key={i}> { h.label } </div> ))}
            </React.Fragment> )
}

export const MultiplesFormsTable: React.FunctionComponent<MultiplesFormsTable.Params> = ({ dto, dto_schema, headers, onRowAction }) =>{
  
    const [ dataList, setDataList ] = useState<any[]>([])
    const [ errors, setErrors ] = useState<MultiplesFormsTable.Error[]>([])

    useEffect(()=>{  if(dto) handleEntry(dto); },[dto])

    const handleEntry = async (entry: any[]) => {
        var result_errors: any[] =[];
        await Promise.all( (entry).map( async (data_row: any, i :number)=>{
            await validateRow(result_errors, data_row, i)
        })) 
        setDataList(entry)
        setErrors(result_errors)
    }

    const handleInputs = async (name: string, line: number, value: any) => {

        var result_errors: any[]= [];
        var unit_data = dataList[line]
        unit_data[name] = value;

        await validateRow(result_errors,unit_data, line)

        if(result_errors.length > 0 ) {
            const indexOfError  = errors.findIndex(v=>(v.line == line)) 
            setErrors( (prev) => {
                var errors = [ ...prev]
                if (indexOfError !== -1) {  errors.splice(indexOfError, 1, result_errors[0])  } 
                else {  errors.push(result_errors[0])  }    
                return (errors)
            })
        }

        setDataList((prev: any)=>{
            var prev_data: any[] = [ ...prev];

            var unit_data = prev_data[line]
            unit_data[name]=value 

            return (prev_data )
        })

    }

    const validateRow = async (result_errors: any[], row_data: any, line: number) =>{
        const errs: any = await validator.validate(dto_schema, row_data)
        if (errs) { result_errors.push({ line, params: errs }) }
        var row_unit_names = Object.keys(row_data)
        row_unit_names.map((name: string, i: number)=>{
            if(row_data[name] === null){
                row_data[name]=""
            }
        })
    }

    const lineHaError =(errors: any, line: number) =>{
        if(errors.length > 0 ){
            const hasError = errors.find( (e: MultiplesFormsTable.Error) =>e.line === line);
            if(hasError) return hasError.params ?? {}
        }
        return []
    }

    useEffect(()=>{ console.log("data-list", dataList) },[dataList])
    return (
        <div className='csv-reader-table-frame'>
           <section className='csv-reader-table-frame-content' style={{ gridTemplateColumns: `auto repeat(${headers.length}, 1fr)`}}>
                <RenderHeaders headers={headers}></RenderHeaders>
                {dataList.map((data: any, i: number)=>{
                    let line = i;
                    let lineErrors = lineHaError(errors, i);
                    return <RenderRows headers={headers} key={i} line={line} errors={lineErrors} data={data} onInput={handleInputs} onRowAction={onRowAction}></RenderRows>
                })}
           </section>
        </div>
    )
}

export default MultiplesFormsTable

