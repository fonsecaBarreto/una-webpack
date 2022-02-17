import React, { ReactNode, useEffect, useState, useRef } from 'react'
import './style.css'

import { normalizeEntries, normalizeSingleEntry } from './methods'
import { SchemaValidator, Validator } from 'fck-schema-validator'
import MkHeader from './Row/MakeHeader'
import MkContentCol from './Row/MakeEdit'

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
        dialogContext: any,
        schema: SchemaValidator.Schema,
        emitData: (data: any[]) => void,
        trigger_data?: boolean
    }
}

const validator = new Validator()

export const DataTrigger = ()=> {

    const [ data, setData ] = useState(null)
    const [ data_trigger, setData_trigger ] = useState(false)
    const trigger = useRef(data_trigger)

    /* useEffect(()=>{
        if(data_trigger == true){
            requestData().finally(()=>{
                const newtrigger = false;
                setData_trigger(newtrigger)
                trigger.current = newtrigger; 
            })
        }
    },[data_trigger])

    const requestData = async () =>{
        console.log('requesting data data...')
        await new Promise(res=>{
            setTimeout(()=>{
                return res(true)
            },3000)
        })
        console.log("Done.");
    } */

    const emitData = (data: any) =>{
        console.log("aqui", data)
        const newtrigger = false;
        setData_trigger(newtrigger)
        trigger.current = newtrigger; 
    }

    const getData = async () => {
        console.log('trying to get data from ')
        const newtrigger = true;
        setData_trigger(newtrigger)
        trigger.current = newtrigger;

        var data:any = null;
       
        while(trigger.current == true){  
            await new Promise(res=>{
                console.log("looping")
                setTimeout(()=> res(true), 100)
            })
        }
      

        console.log("Data", data)
        return data
    }

    return ({ getData, data_trigger, emitData })
}


export const MultiplesForms: React.FunctionComponent<MultiplesForms.Params> = ({ headers, entries, schema, emitData, conflicts, checkList, trigger_data = false, }) =>{


    const dataTriger = DataTrigger()
    const [data, setData] = useState<any[]>([]);
    const [syncCount, setSyncCount] = useState(0)

    /* Entrada de Dados */
    useEffect(()=>{ normalizeEntries(entries, headers, setData) }, [entries])

    /* Submition */
    useEffect(()=>{ if(trigger_data === true){ setSyncCount(-1) } },[trigger_data])

    //  - ADD NEW EMPTY DATA
    const addBlankData = () =>{ setData(prev=>[  normalizeSingleEntry({}, headers), ...prev, ]) }
    
    //  - REMOVE DATA
    const removeDataFrom = (index:number) =>{
        setData((prev)=>{
            var list = [ ...prev];
            list.splice(index, 1)
            return list
        })
    }
    //  - VALIDAÇÃO DOS CAMPOS DE ACORDO COM O SCHEMA PADRAO
    const validateData = async (object: any): Promise<SchemaValidator.Errors | null> =>{
        return await validator.validate(schema, object);
    }
    // - Data Emitida
    const onDataEmited = ( data: any, index_key:number) =>{

        /* Substitui data com mesmo indereço */
        setData( (prev: any)=>{
            var list = [...prev];
            list.splice(index_key, 1, data);
            return list
        }) 
        /* Atualizar o contador */
        setSyncCount(prev=> prev === -1 ? 1 : prev+1)
    }

    /* Sync */
    useEffect(()=>{  
        /* Quando o contador tem tamanho igual aos dos dados */
        if(syncCount > 0 && syncCount === data.length){
            emitData(data); 
            setSyncCount(0);
        }
    },[data, syncCount])

    return (
        <div className='app-multiples-form'>

            <button onClick={dataTriger.getData}> </button>

            <section className='mform-grid'>
                <MkHeader headers={headers} action={addBlankData}></MkHeader>   
                {
                    data.map((d: any, i: number)=>(
                        <MkContentCol key={d._id} 
                            dataTrigger={dataTriger}
                            conflict={conflicts[d._id]}
                            onValidation={validateData} headers={headers}
                            initial_data={d} 
                            emitData={ syncCount === -1 ? true : false }
                            onData={(inner_data: any)=>onDataEmited(inner_data,i)}
                            onClick={()=>alert("teste")}
                            onDelete={()=>removeDataFrom(i)}>
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
