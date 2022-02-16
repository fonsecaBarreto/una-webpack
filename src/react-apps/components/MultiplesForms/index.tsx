import React, { ReactNode, useEffect, useState } from 'react'
import './style.css'
import FormRow from './FormRow'
import { normalizeEntries, normalizeSingleEntry } from './methods'
import { SchemaValidator, Validator } from 'fck-schema-validator'
import { IoIosAddCircleOutline } from 'react-icons/io'

export namespace MultiplesForms {
    export type Header = { 
        columns?: number, 
        label: string, 
        value: string,  
        type?: "text" | "select", 
        list?: {label: string, value: string}[]
    }
    export type Params = {
        entries: any[]
        conflicts: any
        checkList: any
        headers: Header[],
        dialogContext: any,
        schema: SchemaValidator.Schema,
        getData: (data: any[]) => void,
        dataTrigger?: boolean
    }
}

const validator = new Validator()

export const MultiplesForms: React.FunctionComponent<MultiplesForms.Params> = ({ dataTrigger = false, headers, entries, schema, dialogContext, getData, conflicts, checkList}) =>{

    const [data, setData] = useState<any[]>([]);
    const [syncCount, setSyncCount] = useState(0)

    /* Entrada de Dados */
    useEffect(()=>{ normalizeEntries(entries, headers, setData) }, [entries])

    /* Submition */
    useEffect(()=>{ if(dataTrigger === true){ setSyncCount(-1)  } },[dataTrigger])
    useEffect(()=>{  
        if(syncCount > 0 && syncCount === data.length){
            getData(data);
            setSyncCount(0);
        }
    },[syncCount])

    // Methods 
    //  - ADD NEW EMPTY DATA
    const addBlankData = () =>{ setData(prev=>[  normalizeSingleEntry({}, headers), ...prev, ]) }
    //  - vALIDAÇÃO DOS CAMPOS DE ACORDO COM O SCHEMA PADRAO
    const validateData = async (object: any): Promise<SchemaValidator.Errors | null> =>{
        return await validator.validate(schema, object);
    }

    const onDataChange = ( data: any, index_key:number) =>{
        setData( (prev: any)=>{
            var list =[...prev];
            list.splice(index_key,1,data);
            return list
        }) 
        setSyncCount(prev=> prev === -1 ? 1 : prev+1)
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
            <section className='appmfg'>
                <RenderHeader headers={headers} action={addBlankData}></RenderHeader>   
                {
                    data.map((d: any, i: number)=>(
                        <FormRow 
                            success={checkList[d._id]}
                            conflict={conflicts[d._id]}
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


export const MfgRow = ({ columns, children, isHeader=false }: { isHeader?: boolean, columns: number, children: any }) =>{


    /* 
        .app-multiples-form-row.apmfr-success{
            position: relative;
        }

        .app-multiples-form-row.apmfr-success::after{
            content: "";
            position: absolute;
            top:0;
            left: 0;
            width: calc(100%);
            height: calc( 100%);
            background-color: rgba(43, 255, 156, 0.2);
            border-radius: 5px;
        }
    */

    return (
        <div className={`appmfg-row ${isHeader ? 'appmfg-header' : '' }`}>
            { 
                React.Children.map(children, (x: ReactNode,i) =>(
                    <section key={i} style={ i != 1 ? {} : { gridTemplateColumns: `repeat(${columns * 3}, 1fr)` } }> 
                        {x} 
                    </section>
                ))
            }         
        </div>
    )
}

const RenderHeader = ({headers, action}:{ headers:any[], action: any}) =>{
    return (
        <MfgRow columns={headers.length} isHeader>
            <React.Fragment>
                <button onClick={action}> <IoIosAddCircleOutline/> </button> 
            </React.Fragment>

            <React.Fragment>
                { 
                    headers.map((h: any, i: number)=> ( 
                        <div key={i} style={{gridColumn: `span ${h.columns ?? 3}`}} > 
                            { h.label }
                        </div> 
                    ))
                } 
            </React.Fragment>
            <React.Fragment> <button> Outro </button> </React.Fragment>
        </MfgRow>
    )
}

export default MultiplesForms