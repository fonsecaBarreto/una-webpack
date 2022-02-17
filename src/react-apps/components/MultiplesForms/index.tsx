import React, { ReactNode, useEffect, useState, useRef } from 'react'
import './style.css'
import { normalizeEntries, normalizeSingleEntry } from './methods'
import { SchemaValidator, Validator } from 'fck-schema-validator'
import MkHeader from './Row/MakeHeader'
import MkContentCol from './Row/MakeEdit'
import UseCounter from '@/react-apps/components/utils/UseCounter'
import { useData } from '../utils/UseData'

export namespace MultiplesForms {
    export type Header = {  
        label: string, 
        value: string, 
        type?: "text" | "select", 
        list?: {label: string, value: string}[]
        columns?: number, 
    }
    export type Params = {
        entries: any[]
        conflicts: any
        checkList: any
        headers: Header[],
        schema: SchemaValidator.Schema,
        trigger: any
    }
}

const validator = new Validator()

export const MultiplesForms: React.FunctionComponent<MultiplesForms.Params> = ({ trigger, headers, entries, schema, conflicts, checkList }) =>{

    const counter = UseCounter()
    const data = useData([])
    useEffect(()=>{ 
        trigger.setCallBack( async ()=>{ 
            counter.setCount(0);
            while(counter.getCount() < data.get().length){
                await new Promise(res=>{ setTimeout(()=>res(true),100)})
            }
            return data.get()
        }) 
    },[])

    useEffect(()=>{ 
        var final_data = normalizeEntries(entries, headers) 
        data.set(final_data)
        counter.setCount(final_data.length)
    }, [entries])

    const addBlankData = () =>{ 
        var prev = [ normalizeSingleEntry({}, headers), ...data.get()]
        data.set(prev)
        counter.setCount(counter.getCount()+1)
    }
    const rmDataFrom = (index:number) =>{
        var prev = [ ...data.get()]
        prev.splice(index, 1)
        data.set(prev)
        counter.setCount(counter.getCount()-1)
    }
    const validateData = async (object: any): Promise<SchemaValidator.Errors | null> =>{
        return await validator.validate(schema, object);
    }
    const onDataEmited = async ( data_entry: any ) =>{
        var localData = [ ...data.get() ]
        const indexof = localData.findIndex((v:any)=>v._id==data_entry._id);
        const count = counter.getCount() + 1;
        localData.splice(indexof, 1, data_entry);
        data.set(localData);
        counter.setCount(count)   
    }
    return (
        <div className='app-multiples-form'>
            {counter.hook - data.get().length}
            <section className='mform-grid'>
                <MkHeader headers={headers} action={addBlankData}></MkHeader>   
                {
                    data.hook.map((d: any, i: number)=>(
                        <MkContentCol 
                            key={d._id}
                            initial_data={d} 
                            conflict={conflicts[d._id]}
                            success={checkList[d.id]}
                            headers={headers}
                            onTrigger={ { on: (counter.hook === 0 ) ? true : false , call: onDataEmited } }
                            onClick={()=>alert("teste")}
                            onDelete={() =>rmDataFrom(i)} 
                            onValidation={validateData}>
                        </MkContentCol>
                    ))
                }       
           </section>
        </div>
    )
}

export default MultiplesForms

  /* const openNewProductDialogModal = () =>{
        dialogContext.push(MakeDialogConfig(({onAction})=><FormModal onAction={onAction} initial_errors={formState.errors.get} initial_data={formState.data.get} headers={headers}></FormModal>, (data) =>{
            if(data !== -1){ formState.data.set(data); }
            return -1;
        }, "Editar Produto"))
    } */
