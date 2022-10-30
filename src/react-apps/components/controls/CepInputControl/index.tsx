import React, { ChangeEvent, useState } from 'react'
import './style.css'
import { searchCep } from '@/services/viacep'
import Boomimage from "./search.svg"
import {cepMask} from "@/react-apps/components/utils/masks"

export type CepInputControlProps ={
    value: string, 
    onChange: (k: string, value: string) => void;
}

export const CepInputControl: React.FunctionComponent<CepInputControlProps> = (props) => {
    
    const { value, onChange } = props;

    const submit = async () =>{
        try {
            const resp = await searchCep(value);
            onChange("RESULT", resp)
        } catch(err:any) { 
            alert(err?.message ?? "Cep inválido!");
        }
    }

    const handleInputs = (e: ChangeEvent<HTMLInputElement>) =>{
        onChange("INPUT",cepMask(e.target.value)) 
    }
    return (
        <div className='cepinput-control'>
            <input 
                type="text"
                value={value??""} 
                placeholder={'Exemplo : 999999-999'} 
                onInput={handleInputs}>
            </input>
            <button className='' onClick={submit}> 
                <img src={Boomimage}/>
            </button>
        </div>
          
    )
}

export default CepInputControl