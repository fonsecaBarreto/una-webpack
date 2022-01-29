import React, { useEffect } from 'react'
import './style.css'

import { StateAdapter, UseStateAdapter } from 'fck-components/lib/Controls'
import FormModal from '../FormModal'
import { MakeDialogConfig } from 'fck-react-dialog'
import { SchemaValidator } from 'fck-schema-validator'
import { RiErrorWarningLine } from 'react-icons/ri'
import { AiOutlineCheckCircle } from 'react-icons/ai'
export namespace MultiplesFormRow {
    export type Params = {
        initial_data: any[],
        dialogContext: any,
        headers: { label: string, value: string }[],
        validate: (data: any) => Promise<SchemaValidator.Errors | null>
    }
}

export const FormRowTextInput = ({ name, state, onDoubleClick }:{ state: StateAdapter.Handler ,name: string, onDoubleClick?: (e:any) => void }) =>{
    var value = state.data.get[name]
    var error = state.errors.get[name]
    return (
        <div className={`m-form-row-text-input ${ error ? "error": ""}`} onDoubleClick={onDoubleClick && onDoubleClick}>
            <input value={value} onInput={(e: any)=>state.data.onInput(name, e.target.value ,false)}></input>
        </div>
    )
}

export const MultiplesFormRow: React.FunctionComponent<MultiplesFormRow.Params> = ({initial_data, dialogContext, headers, validate}) => {
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
                Object.keys(initial_data).map((name:any, i: number)=>{
                    return (
                        <div key={i}>
                            <FormRowTextInput name={name} state={formState} ></FormRowTextInput>
                        </div>
                    )
                })
            }
            </section>
        </div>
    )
}


export default MultiplesFormRow