import React, { useEffect, useRef, useState } from 'react'
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls'
import { SchemaValidator } from 'fck-schema-validator'
import { RiErrorWarningLine } from 'react-icons/ri'
import { AiOutlineCheckCircle, AiOutlineCloudSync } from 'react-icons/ai'
import MultiplesForms from '../..'
import { IoMdTrash } from 'react-icons/io'
import CellInput from './Inputs'
import MakeRow from '../MakeRow'

export namespace MakeEditContent {
    export type Params = {
        initial_data: any,
        conflict: any,
        success: any,
        headers: MultiplesForms.Header[],
        onValidation: (data: any) => Promise<SchemaValidator.Errors | null>,
        onDelete: any
        onClick: any,
        onTrigger: any
    }
}

export const MakeEditContent: React.FunctionComponent<MakeEditContent.Params> = ({ onTrigger, conflict, success, initial_data, headers, onValidation, onClick,  onDelete  }) => {

    const formState = UseStateAdapter(initial_data);
    useEffect(()=>{ if(onTrigger.on === true ){ onTrigger.call(formState.data.get)} },[onTrigger.on])
    useEffect(()=>{ formState.errors.set(conflict?? {}) }, [conflict]) 
    useEffect(()=>{ verifyData({ ...formState.data.get}) },[formState.data.get])

    const verifyData = async (d: object) =>{
        var errors = await onValidation(d)
        if(errors == null) return formState.errors.set({});

        /* Sanitiza os erros em formato de objeto, no caso das estruturas de chave e valor */
        var result_errs: any = { ...errors };
        
        Object.keys(errors).map(e=>{
            let err = result_errs[e]
            if(typeof err == "string") return result_errs[e] = err
            result_errs[e] = `Selecione uma opção válida`
        })
      
        formState.errors.set(result_errs ?? {})
    }
    return (
        <MakeRow columns={headers.length} freeze={success ? true : false}>
            <React.Fragment>
                <button className={`row-status-btn ${success ? "success": ""}`} onClick={()=>onClick(formState)}>
                    <span>
                    {   
                        ( Object.keys(formState.errors.get).length > 0 ) 
                        ? <RiErrorWarningLine/> 
                        : success ? <AiOutlineCloudSync/>
                        :<AiOutlineCheckCircle/>    
                    } 
                    </span>
                </button>
            </React.Fragment>
            <React.Fragment>
                {   
                    headers.map((h: MultiplesForms.Header, i: number)=> {
                        let { value: name, type, list } = h
                        var error = formState.errors.get[name];
                        return (
                            <div key={i}  style={{gridColumn: `span ${h.columns ?? 3}`}}> 
                                <CellInput  error={error} type={type} state={formState} name={name} list={list} >
                                </CellInput>
                            </div>
                    )})
                }
            </React.Fragment>
            <React.Fragment> 
                <button  onClick={onDelete}> <IoMdTrash/> </button> 
            </React.Fragment>
        </MakeRow>
    )
}
export default MakeEditContent