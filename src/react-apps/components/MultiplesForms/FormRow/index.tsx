import React, { useEffect } from 'react'
import './style.css'
import { StateAdapter, UseStateAdapter } from 'fck-components/lib/Controls'
import FormModal from '../FormModal'
import { MakeDialogConfig } from 'fck-react-dialog'
import { SchemaValidator } from 'fck-schema-validator'
import { RiErrorWarningLine } from 'react-icons/ri'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import MultiplesForms from '..'

import SelectInput  from '../Inputs/Select'
import TextInput  from '../Inputs/Text'

export namespace MultiplesFormRow {
    export type Params = {
        initial_data: any[],
        dialogContext: any,
        headers: { label: string, value: string }[],
        validate: (data: any) => Promise<SchemaValidator.Errors | null>,
    }
    export type InputParams = {
        type: string | "text" | "select",
        list?: {label: string, value: string}[],
        state: StateAdapter.Handler ,
        name: string, 
        onDoubleClick?: (e:any) => void 
    }
}

export const FormRowInput: React.FunctionComponent<MultiplesFormRow.InputParams> = ({ name, state, onDoubleClick, type, list}) =>{

    var error = state.errors.get[name]

    return (
        <div className={`m-form-row-input ${ error ? "error": ""}`} onDoubleClick={onDoubleClick && onDoubleClick}> { 
                type == "select" ? <SelectInput name={name} state={state} list={list ?? []}></SelectInput> 
                :   <TextInput onDoubleClick={onDoubleClick} state={state} name={name} ></TextInput>
        } </div>
    )
   
}

export const MultiplesFormRow: React.FunctionComponent<MultiplesFormRow.Params> = ({ initial_data, dialogContext, headers, validate }) => {
    const formState = UseStateAdapter(initial_data);

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

    useEffect(()=>{
        verifyData({ ...formState.data.get})
    },[formState.data.get])

    return (

        <div className='app-multiples-form-row' onDoubleClick={openNewProductDialogModal} >

            <section >
                <div onClick={openNewProductDialogModal}>

                {
                    Object.keys(formState.errors.get).length > 0 ?
                    <span> <RiErrorWarningLine/></span>
                    : <span> <AiOutlineCheckCircle/> </span>
                    
                }
                </div>
            </section>

            <section style={{gridTemplateColumns: `repeat(${headers.length}, 1fr)`}}>

            {   
                headers.map((h: MultiplesForms.Header, i: number)=> {
                let { value: name, type, list } = h
                return (
                    <div key={i}>
                        <FormRowInput name={name} state={formState} type={type ?? "text"} list={list}  ></FormRowInput>
                    </div>
                )})
            }

            </section>
        </div>
    )
}


export default MultiplesFormRow