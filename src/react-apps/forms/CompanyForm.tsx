import React, { useContext, useEffect } from 'react'
import "./style.css"
import { Controls, Forming } from 'fck-react-input-controls'
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls'
import UnaModalForm from '../components/una/ModalForm'
import SwitchButton from '../components/una/switchButton'
import { companhiasServices } from '@/services/api/companhias-service'
import { GlobalContext } from "@/react-apps/apps/GlobalContext"
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import Switch from "react-switch";

const INITIAL_DATA= {
    id: "",
    nomeFantasia: "",
    razaoSocial: "",
    cnpj: "",
    emailFinanceiro: "",
    inscricaoEstadual: "",
    telefoneComercial: "",
    ativo: false,
    isMart: false,
    isVendor: false
}

export namespace CompanyForm{
    export type Params = {
        entry: any,
        onAction: any
    }
}

export const CompanyForm: React.FunctionComponent<CompanyForm.Params> = ({ entry, onAction}) =>{

    const state = UseStateAdapter(INITIAL_DATA)
    useEffect(()=>{ state.data.set(entry ? entry : INITIAL_DATA) },[entry])

    const submit = async () =>{
        state.loading.set(true)
        state.errors.clear()
        try{ 
            const params = { ...state.data.get };
            const company_id = state.data.get['id'];
            await companhiasServices.saveV2(params, company_id)
            onAction(1);
        }catch(err:any){
            if (err.params) {  state.errors.set(err.params) }
        }finally{
            state.loading.set(false)
        }
    }
    return (
        <UnaModalForm onSave={submit} onCancel={()=>{ onAction(-1)}}  >
            <Forming.FormGrid title="Informações Gerais:" columns={[12,12,12,12,12,12,12]} freeze={state.loading.get}>
                <Controls.TextBox placeHolder="Exemplo: 99.999.999/9999-99" mask="99.999.999/9999-99" 
                    state={state} label="CNPJ " name={"cnpj"}  type={Controls.TextBoxTypes.TEXT} > </Controls.TextBox>
                <Controls.TextBox placeHolder="Exemplo: Minha Empresa"
                    state={state} label={"Nome Fantasia"} name={"nomeFantasia"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="Exemplo: Minha Empresa LTDA"
                    state={state} label={"Razão Social"} name={"razaoSocial"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="Exemplo: meuemail@mail.com"
                    state={state} label={"E-mail financeiro"} name={"emailFinanceiro"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder='Exemplo: 123.123.123.123' mask="999.999.999.999"
                    state={state} label={"Inscrição Estadual"} name={"inscricaoEstadual"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox placeHolder="(22) 01234-1234" mask="(99) 99999-9999"
                    state={state} label={"Telefone Comercial"} name={"telefoneComercial"} type={Controls.TextBoxTypes.TEXT}/>
                <Forming.FormGrid title="Status: " columns={[12,6,6]} freeze={state.loading.get}>
                        <Forming.InputWrapper label={"Ativo"}>
                            <Switch onChange={(v: boolean)=>state.data.onInput("ativo",v)} checked={state.data.get["ativo"]} />
                        </Forming.InputWrapper>

                        <Forming.InputWrapper label={"Habilitado a Compras"}>
                            <Switch onChange={(v: boolean)=>state.data.onInput("isMart",v)} checked={state.data.get["isMart"]} />
                        </Forming.InputWrapper>

                        <Forming.InputWrapper label={"Habilitado a Vendas"}>
                            <Switch onChange={(v: boolean)=>state.data.onInput("isVendor",v)} checked={state.data.get["isVendor"]} />
                        </Forming.InputWrapper>
                </Forming.FormGrid>
            </Forming.FormGrid>
        </UnaModalForm>
    )
}

export default CompanyForm