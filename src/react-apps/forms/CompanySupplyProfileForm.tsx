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
    minimum_purchase: 0
}

export namespace CompanySupplyProfileForm{
    export type Params = {
        entry: any,
        company_id: string,
        onAction: any
    }
}

export const CompanySupplyProfileForm: React.FunctionComponent<CompanySupplyProfileForm.Params> = ({ entry, company_id, onAction }) =>{

    const state = UseStateAdapter(INITIAL_DATA)
    useEffect(()=>{ state.data.set(entry ? entry : INITIAL_DATA) },[entry])

    const submit = async () =>{
        state.loading.set(true)
        state.errors.clear()
        try{ 
            const params = { ...state.data.get, company_id};
            await companhiasServices.upserSupplyProfile(params) 
            onAction(1);
        }catch(err:any){
            if (err.params) {  state.errors.set(err.params) }
        }finally{
            state.loading.set(false)
        }
    }
    return (
        <UnaModalForm onSave={submit} onCancel={()=>{ onAction(-1)}}  >
            <Forming.FormGrid title="Perfil de Fornecimento" columns={[]} freeze={state.loading.get}>
                <Controls.TextBox placeHolder="Compra mínima"
                    state={state} label={"Compra mínima"} name={"minimum_purchase"} type={Controls.TextBoxTypes.NUMBER}/>
            </Forming.FormGrid>
        </UnaModalForm>
    )
}

export default CompanySupplyProfileForm