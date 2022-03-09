import React, { useEffect } from 'react'
import "./style.css"
import { Controls, Forming } from 'fck-react-input-controls'
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls'
import UnaModalForm from '../components/una/ModalForm'
import ufs from './ufs.json'

import { searchCep } from '@/services/viacep'
const INITIAL_DATA= {
    rua: "",
    numero: "",
    detalhes: "",
    bairro: "",
    cidade: "",
    uf: { value:"", label: ""},
    cep: ""
}

export namespace UserForm{
    export type Params = {
        entry: any
    }
}

export const UserForm: React.FunctionComponent<UserForm.Params> = ({ entry }) =>{
    const state = UseStateAdapter(INITIAL_DATA)

    useEffect(()=>{ 
        state.data.set(entry ? entry : INITIAL_DATA) 
    },[entry])

    useEffect(()=>{
        console.log('cep aqui')
    },[state.data.get])

    return (
        <UnaModalForm onSave={()=>{}} onCancel={()=>{}} >
            <Forming.FormGrid title="" columns={[6, 6, 7, 5, 12]}>
                <Controls.TextBox state={state} label={"Cep"} name={"cep"} 
                    type={Controls.TextBoxTypes.TEXT}  placeHolder={'Exemplo : 123456-123'}  mask="99999-999"  />
                <Controls.SelectBox 
                    state={state} label="UF" name={"uf"} list={ufs.UFS}  > </Controls.SelectBox>
                <Controls.TextBox placeHolder={'Exemplo: Rua Silva'}
                    state={state} label={"Logradouro"} name={"rua"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder={"Exemplo: 99"} 
                    state={state} label={"Numero"} name={"numero"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder={"Exemplo: Bairro das Flores"}
                    state={state} label={"Bairro "} name={"bairro"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder={"Exemplo: Macaé"}
                    state={state} label="Cidade" name={"cidade"} type={Controls.TextBoxTypes.TEXT}/> 
                <Controls.TextBox placeHolder={"Exemplo: Proximo a fármacia"}
                    state={state} label="Complemento " name={"detalhes"} type={Controls.TextBoxTypes.TEXTAREA}/> 
            </Forming.FormGrid>
        </UnaModalForm>
    )
}

export default UserForm