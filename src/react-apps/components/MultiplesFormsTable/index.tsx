import React, { useEffect, useState, useContext, FunctionComponent} from 'react'
import './style.css'
import { SchemaValidator, Validator } from 'fck-schema-validator'
import RenderRows, { MultiplesFormsTableRow } from './Rows'

export namespace MultiplesFormsTable {

    export type Params = {
        initial_dtos: any[],
        dto_schema: SchemaValidator.Schema,
        headers: {label: string, value: string}[],
        onRowAction: MultiplesFormsTableRow.ActionHandler
    }

    export type Error ={
        line: number,
        params: Record<string, any>[]
    }
}

const validator = new Validator();

export const MultiplesFormsTable: React.FunctionComponent<MultiplesFormsTable.Params> = ({ initial_dtos, dto_schema, headers, onRowAction }) =>{
  
    const [ dataList, setDataList ] = useState<any[]>([])
    const [ errors, setErrors ] = useState<MultiplesFormsTable.Error[]>([])

    useEffect(()=>{  if(initial_dtos?.length > 0) handleEntry(initial_dtos); },[initial_dtos])

    /* Quandos os dados inciciais entram na memoria */
    const handleEntry = async (entry: any[]) => {
        var result_errors: any[] =[];
        await Promise.all( (entry).map( async (data_row: any, i :number)=>{
            await validateRow(result_errors, data_row, i)
        })) 
        setDataList(entry)
        setErrors(result_errors)
    }
    /* Atualzia todo o objecto */
    const handleSingleEntry: MultiplesFormsTableRow.EntryHandler = async ( line, payload) =>{
        var result_errors: any[] =[];
        await validateRow(result_errors, payload, line)
        handleErrors(result_errors, line)
        return setDataList(prev=>{
            const list: any[] = [ ...prev];
            list[line] = payload
            return (list)
        }) 
    }

    /*  Atualiza o parametro */
    const handleInputs = async (name: string, line: number, value: any) => {
        var result_errors: any[]= [];
        var unit_data = dataList[line]
        unit_data[name] = value;
        await validateRow(result_errors,unit_data, line)
        handleErrors(result_errors, line)
        setDataList((prev: any)=>{
            var prev_data: any[] = [ ...prev];
            var unit_data = prev_data[line]
            unit_data[name]=value 
            return (prev_data )
        })

    }

    /* Gerenciar o erro por linha */
    const handleErrors = (result_errors: any[], line: number) =>{
        const indexOfError  = errors.findIndex(v=>(v.line == line)) 
        setErrors( (prev) => {
            var errors = [ ...prev]
            if (indexOfError !== -1) { 
                if(result_errors.length){ errors.splice(indexOfError, 1, result_errors[0])   } 
                else{ errors.splice(indexOfError, 1) }
            } 
            else if(result_errors.length){
                errors.push(result_errors[0]) 
            }    
            return (errors)
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

    return (
        <div className='csv-reader-table-frame'>
           <section className='csv-reader-table-frame-content' style={{ gridTemplateColumns: `auto repeat(${headers.length}, 1fr)`}}>
                
                <span> </span>
                { headers.map((h: any, i: number)=> ( <div className='csv-reader-table-frame-content-cell' key={i}> { h.label } </div> ))}

                {dataList.map((data: any, i: number)=>{
                    let line = i;
                    let lineErrors = lineHaError(errors, i);
                    return <RenderRows onEntry={handleSingleEntry} headers={headers} key={i} line={line} errors={lineErrors} data={data} onInput={handleInputs} onRowAction={onRowAction}></RenderRows>
                })}
           </section>
        </div>
    )
}



export default MultiplesFormsTable

