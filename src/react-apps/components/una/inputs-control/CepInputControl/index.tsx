import React, { ChangeEvent, useState } from 'react'
import { Forming } from "fck-react-input-controls"
import { useEffect, useRef } from "react";
import InputMask from 'react-input-mask';
import './style.css'
import { searchCep } from '@/services/viacep'
import { BiSearch } from 'react-icons/bi'

export const CepInputControl = ({ value, onInput, onData, beforeSubmit }:{ beforeSubmit: Function, value: string, onInput: (value: string) => void, onData: (value?:string) => void }) =>{
    const prevValue = useRef("");
    const [ loading, setLoading ] = useState(false)

    /* useEffect(()=>{
        console.log("Value has changed", value, "aqui")
        console.log("ref ->", prevValue.current)
    },[value]) */

    const submit = async () =>{
        beforeSubmit()
        try {
            const resp = await searchCep(value);
            onData(resp);
        } catch(err:any) { 
            alert(err?.message ?? "Cep inválido!");
        }
        onData()
    }

    return (
        <Forming.InputWrapper label={"Cep"} >
            <div className='cepinput-control'>
                <InputMask className="custom-input" type={'text'} placeholder={'Exemplo : 123456-123'} mask={"99999-999"} value={value??""} 
                    onChange={ ( e: ChangeEvent<HTMLInputElement>) => {
                        prevValue.current = value
                        onInput(e.target.value) }}/>
                <button onClick={submit}> <BiSearch/> </button>
            </div>
        </Forming.InputWrapper>       
    )
}

//pattern="\(\d{2}\)\s*\d{5}-\d{4}" required

export default CepInputControl