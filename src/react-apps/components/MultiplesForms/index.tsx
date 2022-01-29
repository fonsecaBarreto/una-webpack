import React, { ReactNode, useEffect, useState } from 'react'
import './style.css'
import MultiplesFormRow from './FormRow'
import { normalizeData } from './methods'
import { SchemaValidator, Validator } from 'fck-schema-validator'

export namespace MultiplesForms{
    export type Header = { label: string, value: string, type?: "text" | "select", list?: {label: string, value: string}[]}
    export type Params = {
        headers: Header[],
        entry: any[]
        dialogContext: any,
        schema: SchemaValidator.Schema
    }
}

const validator = new Validator()

export const MultiplesForms: React.FunctionComponent<MultiplesForms.Params> = ({ headers, entry, schema, dialogContext }) =>{

    const [data, setdata] = useState<any[]>([])

    useEffect(()=>{  
        return setdata(normalizeData(entry, headers))
    },[entry])

    const validateData = async (object: any): Promise<SchemaValidator.Errors | null> =>{
        const errors = await validator.validate(schema, object);
        return errors
    }

    return (
        <div className='app-multiples-form'>
            <section>

                <div className='app-multiples-form-row'>
                    <section> </section>
                    <section style={{gridTemplateColumns: `repeat(${headers.length}, 1fr)`}}>
                        { headers.map((h: any, i: number)=> ( <div key={i}> { h.label } </div> ))}
                    </section>
                </div>

                {
                    data.map((d: any, i: number)=>(
                        <MultiplesFormRow validate={validateData} headers={headers} key={i} initial_data={d} dialogContext={dialogContext}></MultiplesFormRow>
                    ))
                }

           </section>
        </div>
    )
}


export default MultiplesForms