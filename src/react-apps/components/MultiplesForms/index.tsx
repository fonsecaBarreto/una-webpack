import React, { ReactNode, useEffect, useState } from 'react'
import './style.css'
import FormRow from './FormRow'
import { normalizeData, normalizeValues } from './methods'
import { SchemaValidator, Validator } from 'fck-schema-validator'

export namespace MultiplesForms{
    export type Header = { label: string, value: string,  type?: "text" | "select", list?: {label: string, value: string}[]}
    export type Params = {
        headers: Header[],
        entry: any[]
        dialogContext: any,
        schema: SchemaValidator.Schema
    }
}

const validator = new Validator()

export const MultiplesForms: React.FunctionComponent<MultiplesForms.Params> = ({ headers, entry, schema, dialogContext }) =>{

    const [data, setData] = useState<any[]>([])

    useEffect(()=>{
        const resultData = normalizeData(entry, headers)
        setData(resultData)
    } ,[entry])

    const onDataChange = ( data: any, index:number) =>{
        console.log("Adding here", index)
        setData( (prev: any)=>{
            var list =[...prev]
            list.splice(index,1,data)
            return list
        }) 
    }

    const validateData = async (object: any): Promise<SchemaValidator.Errors | null> =>{
        return await validator.validate(schema, object);
    }

    const addBlankData = () =>{ 
        setData(prev=>[  normalizeValues({}, headers), ...prev, ])
    }

    const removeDataFrom = (index:number) =>{
        setData((prev)=>{
            var list = [ ...prev]
            list.splice(index, 1)
            return list
        })
    }

    return (
        <div className='app-multiples-form'>
            <section>
                <div className='app-multiples-form-row'>
                    <section> <button onClick={addBlankData}> add </button> </section>
                    <section style={{gridTemplateColumns: `repeat(${headers.length}, 1fr)`}}>
                        { headers.map((h: any, i: number)=> ( <div  className="app-multiples-form-row-header-cell"key={i}> { h.label } </div> ))}
                    </section>
                    <section> </section>
                </div>

                {
                    data.map((d: any, i: number)=>(
                        <FormRow 
                            key={d._id}
                            onChange={(inner_state: any)=>onDataChange(inner_state,i)}
                            validate={validateData} headers={headers}
                            initial_data={d} dialogContext={dialogContext}
                            onDelete={()=>removeDataFrom(i)}>
                        </FormRow>
                    ))
                }

                {JSON.stringify(data)}
           </section>
        </div>
    )
}

export default MultiplesForms