import * as React from 'react';
import "./style.css"
import CepInputControl from '@/react-apps/components/una/inputs-control/CepInputControl';
import { Controls, Forming } from 'fck-react-input-controls';
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls';
import { GrLocation } from 'react-icons/gr';

const INITIAL_DATA= {
    bairro: "",
    cidade: "",
    uf: { value:"", label: ""},
    cep: ""
}

export namespace CepModal {
    export type Params = {
        onChange: any
    }
}

export const CepModal: React.FunctionComponent<CepModal.Params> = ({ onChange }) => {
    const state = UseStateAdapter(INITIAL_DATA);
    const handleCep = (result: any) =>{
        if(!result) return state.loading.set(false)
        onChange(["LOCATION", result])
       /*  setCepFound(true)
        console.log(result)
        const { ibge, uf, bairro, localidade }  = result
        let str = `${localidade},${bairro} - ${uf} `

        setResultStr(str) */
    }

    
    return(
        <div className='bl-cep-modal'>

            <Forming.FormGrid title="" columns={[12]} freeze={state.loading.get}>
                <CepInputControl beforeSubmit={()=>state.loading.set(true)} onData={handleCep} 
                    value={state.data.get['cep']} onInput={(v: any)=>state.data.onInput('cep', v)}/>
            </Forming.FormGrid>

            <div className='bg-cep-modal-user'>
                <span> Ja sou Cadastrado </span>
                <button className='una-submit-button-color' onClick={()=>onChange(['SIGNIN'])}>  Entrar  </button>
            </div>

        </div>
    )
}   

export default CepModal