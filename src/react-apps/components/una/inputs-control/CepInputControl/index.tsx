import React, { ChangeEvent, useState } from 'react'
import { Forming } from "fck-react-input-controls"
import { useEffect, useRef } from "react";
import InputMask from 'react-input-mask';
import './style.css'
import { searchCep } from '@/services/viacep'

export const CepInputControl = ({ value, onInput, onData, beforeSubmit }:{ beforeSubmit: Function, value: string, onInput: (value: string) => void, onData: (value?:string) => void }) =>{
    const prevValue = useRef("");

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
                <button onClick={submit}> Ok </button>
            </div>
        </Forming.InputWrapper>       
    )
}

export default CepInputControl