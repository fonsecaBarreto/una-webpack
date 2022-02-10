import React, { useEffect } from 'react'
import "./style.css"
import { Controls, Forming } from 'fck-react-input-controls'
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls'
import UnaModalForm from '../components/una/ModalForm'

const INITIAL_DATA= {
    nomeFantasia: "",
    razaoSocial: "",
    cnpj: "",
    emailFinanceiro: "",
    inscricaoEstadual: "",
    telefoneComercial: ""
}

export namespace CompanyForm{
    export type Params = {
        entry: any
    }
}

export const CompanyForm: React.FunctionComponent<CompanyForm.Params> = ({ entry }) =>{
    const state = UseStateAdapter(INITIAL_DATA)

    useEffect(()=>{ 
        state.data.set(entry ? entry : INITIAL_DATA) 
    },[entry])

    return (
        <UnaModalForm onSave={()=>{}} onCancel={()=>{}} >
            <Forming.FormGrid title="" columns={[]}>
                <Controls.TextBox placeHolder="Exemplo: Minha Empresa"
                    state={state} label={"Nome Fantasia"} name={"nomeFantasia"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="Exemplo: Minha Empresa LTDA"
                    state={state} label={"Razão Social"} name={"razaoSocial"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="Exemplo: 99.999.999/9999-99" mask="99.999.999/9999-99" 
                    state={state} label="CNPJ " name={"cnpj"}  type={Controls.TextBoxTypes.TEXT} > </Controls.TextBox>
                <Controls.TextBox placeHolder="Exemplo: meuemail@mail.com"
                    state={state} label={"E-mail financeiro"} name={"emailFinanceiro"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder='Exemplo: 123.123.123.123' mask="999.999.999.999"
                    state={state} label={"Inscrição Estadual"} name={"inscricaoEstadual"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="(22) 01234-1234" mask="(99) 99999-9999"
                    state={state} label={"Telefone Comercial"} name={"telefoneComercial"} type={Controls.TextBoxTypes.TEXT}/>
            </Forming.FormGrid>
        </UnaModalForm>
    )
}

export default CompanyForm