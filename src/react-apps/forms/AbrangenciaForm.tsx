import React, { useContext, useEffect, useState } from 'react'
import "./style.css"
import UnaModalForm from '../components/una/ModalForm'
import Globalcontext from '@/react-apps/apps/main/global-components-context'
import LocationSelector from "fck-br-location-selector"
import { coverageServices } from '@/services/api/companhias-service'
import { MakeNotification, NotificationType } from 'fck-react-dialog'

export namespace AbrangenciaForm{
    export type Params = {
        onAction: any,
        company_id: string
    }
    export type UFCoverage = {
        id: number,
        cidades: string[]
    }
}

const INITIAL_DATA:any = []

export const AbrangenciaForm: React.FunctionComponent<AbrangenciaForm.Params> = ({ onAction, company_id }) =>{
    const [ result_coverage, setResult_coverage ] = useState<AbrangenciaForm.UFCoverage[] | null>(null)
    const [ initial_coverage, setInitial_coverage ] = useState<AbrangenciaForm.UFCoverage[] | null>(null)
    const context = useContext(Globalcontext);

    useEffect(()=> { coverageServices.find(company_id).then((r)=>setInitial_coverage(r?.ufs ?? [])) },[])
    useEffect(()=> { console.log(initial_coverage) },[initial_coverage])

    const submit = async () =>{
        if(!result_coverage) return;
        try{
            const resp = await coverageServices.save(result_coverage, company_id)
            context.dialog.push(MakeNotification(()=>-1,["Salvo com sucesso"], "Sucesso", NotificationType.SUCCESS))
            onAction(-1)
        }catch(err){
            context.dialog.push(MakeNotification(()=>-1,["Não foi possivel salvar abrangencia"], "Falha", NotificationType.FAILURE))
        }
    }
    
    return (
        <UnaModalForm onSave={submit} onCancel={()=>{ onAction(-1)}}  >
            { initial_coverage && 
                <LocationSelector emitData={setResult_coverage} initialData={initial_coverage}></LocationSelector>
            }
        </UnaModalForm>
    )
}

export default AbrangenciaForm