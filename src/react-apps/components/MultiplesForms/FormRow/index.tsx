import React, { useEffect } from 'react'
import './style.css'
import { MakeDialogConfig } from 'fck-react-dialog'
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls'
import { SchemaValidator } from 'fck-schema-validator'

import { RiErrorWarningLine } from 'react-icons/ri'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import MultiplesForms from '..'
import FormModal from '../FormModal'
import SelectInput  from '../Inputs/Select'
import TextInput  from '../Inputs/Text'
import { IoMdTrash } from 'react-icons/io'

export namespace MultiplesFormRow {
    export type Params = {
        emitData:Boolean,
        onChange: Function,
        initial_data: any[],
        dialogContext: any,
        headers: MultiplesForms.Header[],
        validate: (data: any) => Promise<SchemaValidator.Errors | null>,
        onDelete: () =>void,
    }
}


/* Um contador que após para que apos 4 tempo atualizar */

export const MultiplesFormRow: React.FunctionComponent<MultiplesFormRow.Params> = ({ onChange, emitData, initial_data, dialogContext, headers, validate, onDelete }) => {

    const formState = UseStateAdapter(initial_data);
    /* useEffect(()=>{ formState.data.set({...initial_data}) },[initial_data])  */
    useEffect(()=>{ 
        verifyData({ ...formState.data.get}) 
    },[formState.data.get])

    useEffect(()=>{
        if(emitData === true){
            onChange(formState.data.get)
        }
    },[emitData])

    const openNewProductDialogModal = () =>{
        dialogContext.push(MakeDialogConfig(({onAction})=><FormModal onAction={onAction} initial_data={formState.data.get} headers={headers}></FormModal>, (data) =>{
            if(data !== -1){ formState.data.set(data); }
            return -1;
        }))
    }

    const verifyData = async (d: object) =>{
        var errors = await validate(d)
        formState.errors.set(errors ?? {})
    }

    return (
        <div className='app-multiples-form-row' >
            <section >
                <div onClick={openNewProductDialogModal}>
                {
                    Object.keys(formState.errors.get).length > 0 ?
                    <span> <RiErrorWarningLine/></span> : <span> <AiOutlineCheckCircle/> </span>
                } 
                </div>
            </section>
            <section style={{gridTemplateColumns: `repeat(${headers.length * 3}, 1fr)`}}>
            {   
                headers.map((h: MultiplesForms.Header, i: number)=> {
                    let { value: name, type, list } = h
                    var error = formState.errors.get[name];
                    return (
                        <div key={i} className='m-form-row' style={{gridColumn: `span ${h.columns ?? 3}`}}> 
                            <div className={`m-form-row-input ${ error ? "error": ""}`} > 
                                { 
                                    type == "select" ? <SelectInput name={ name} state={formState} list={list ?? []}></SelectInput> 
                                    :   <TextInput state={formState} name={ name} ></TextInput>
                                } 
                            </div> 
                        </div>
                )})
            }
            </section>

            <section> 
                <button onClick={onDelete}> <IoMdTrash/> </button>
            </section>
        </div>
    )
}

export default MultiplesFormRow