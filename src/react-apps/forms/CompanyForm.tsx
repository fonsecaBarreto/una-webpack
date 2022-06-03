import React, { useContext, useEffect } from 'react'
import "./style.css"
import { Controls, Forming } from 'fck-react-input-controls'
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls'
import UnaModalForm from '../components/una/ModalForm'
import SwitchButton from '../components/una/switchButton'
import { companhiasServices } from '@/services/api/companhias-service'
import { GlobalContext } from "@/react-apps/apps/GlobalContext"
import { MakeNotification, NotificationType } from 'fck-react-dialog'

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
        entry: any,
        onData: any,
        onAction: any
    }
}

export const CompanyForm: React.FunctionComponent<CompanyForm.Params> = ({ entry, onAction, onData}) =>{
    const context = useContext(GlobalContext)
    const state = UseStateAdapter(INITIAL_DATA)

    useEffect(()=>{ state.data.set(entry ? entry : INITIAL_DATA) },[entry])

    const submit = async () =>{
        state.loading.set(true)
        state.errors.clear()
        try{
            const data = await companhiasServices.save(state.data.get)
            onAction(-1);
            onData(data)
            context.dialog.push(MakeNotification(() =>{ return -1 },[ "Salvo com sucesso!"],"Sucesso!",NotificationType.SUCCESS))
        }catch(err:any){
            if (err.params) {  state.errors.set(err.params) }
        }finally{
            state.loading.set(false)
        }
    }

    return (
        <UnaModalForm onSave={submit} onCancel={()=>{ onAction(-1)}}  >
            <Forming.FormGrid title="" columns={[]} freeze={state.loading.get}>
                <Controls.TextBox placeHolder="Exemplo: 99.999.999/9999-99" mask="99.999.999/9999-99" 
                    state={state} label="CNPJ " name={"cnpj"}  type={Controls.TextBoxTypes.TEXT} > </Controls.TextBox>
              {/*   <Forming.InputWrapper label={"Status"}>
                    <SwitchButton fill value={state.data.get['ativo'] === true ? 0 : 1} 
                        onInput={(i)=>state.data.onInput("ativo", i === 0 ? true : false)}> 
                        <span className='una-company-status-button active' >  Ativo </span>
                        <span className='una-company-status-button inactive'>  Inativo </span>
                    </SwitchButton>
                </Forming.InputWrapper> */}
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
            </Forming.FormGrid>
        </UnaModalForm>
    )
}

export default CompanyForm