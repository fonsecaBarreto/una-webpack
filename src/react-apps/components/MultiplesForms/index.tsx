import React, { ReactNode, useEffect, useState } from 'react'
import './style.css'
import FormRow from './FormRow'
import { normalizeData, normalizeValues } from './methods'
import { SchemaValidator, Validator } from 'fck-schema-validator'
import { IoIosAddCircleOutline } from 'react-icons/io'

export namespace MultiplesForms{
    export type Header = { columns?: number, label: string, value: string,  type?: "text" | "select", list?: {label: string, value: string}[]}
    export type Params = {
        entry: any[]
        headers: Header[],
        dialogContext: any,
        schema: SchemaValidator.Schema,
        getData: (data: any[]) => void,
        dataTrigger?: boolean
    }
}

const validator = new Validator()

export const MultiplesForms: React.FunctionComponent<MultiplesForms.Params> = ({ dataTrigger = false, headers, entry, schema, dialogContext, getData }) =>{

    const [data, setData] = useState<any[]>([]);
    const [syncCount, setSyncCount] = useState(0)

    useEffect(()=>{
        if(dataTrigger === true){
            setSyncCount(-1)
        }
    },[dataTrigger])

    useEffect(()=>{  
        if(syncCount > 0 && syncCount === data.length){
            getData(data);
            setSyncCount(0);
        }
    },[syncCount])

    useEffect(()=>{
        const resultData = normalizeData(entry, headers)
        setData(resultData)
    } ,[entry])

    const onDataChange = ( data: any, index_key:number) =>{

        setData( (prev: any)=>{
            var list =[...prev];
            list.splice(index_key,1,data);
            return list
        }) 
        setSyncCount(prev=> prev === -1 ? 1 : prev+1)
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

                <div className='app-multiples-form-row multiples-form-row-header'>
                    <section> <button  className={"una-submit-button-color"} onClick={addBlankData}> <IoIosAddCircleOutline/> </button> </section>
                    <section style={{gridTemplateColumns: `repeat(${headers.length * 3}, 1fr)`}}>
                        { headers.map((h: any, i: number)=> ( 
                            <div  
                                className="m-form-row app-multiples-form-row-header-cell"
                                style={{gridColumn: `span ${h.columns ?? 3}`}}
                                key={i}> 
                                { h.label }
                             </div> 
                            ))
                        }
                    </section>
                    <section> </section>
                </div>

                {
                    data.map((d: any, i: number)=>(
                        <FormRow 
                            key={d._id}
                            emitData={syncCount === -1 ? true : false}
                            onChange={(inner_state: any)=>onDataChange(inner_state,i)}
                            validate={validateData} headers={headers}
                            initial_data={d} dialogContext={dialogContext}
                            onDelete={()=>removeDataFrom(i)}>
                        </FormRow>
                    ))
                }
           </section>
        </div>
    )
}

export default MultiplesForms