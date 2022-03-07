import React, { useContext, useState } from 'react'
import "./style.css"
import UnaModalForm from '../components/una/ModalForm'
import Globalcontext from '@/react-apps/apps/main/global-components-context'
import LocationSelector from "fck-br-location-selector/lib/react"


export namespace AbrangenciaForm{
    export type Params = {
        onAction: any
    }
}

const INITIAL_DATA:any = []

export const AbrangenciaForm: React.FunctionComponent<AbrangenciaForm.Params> = ({ onAction }) =>{
    const [ coverage, setCoverage ] = useState(null)
    const context = useContext(Globalcontext);


    const submit = async () =>{
        //deve ter entrada de informção por aqui
        console.log("Ok agora vou salvar a abrangencia", coverage)
        //salvar aqui
    }
    
    return (
        <UnaModalForm onSave={submit} onCancel={()=>{ onAction(-1)}}  >
           <LocationSelector emitData={setCoverage} initialData={INITIAL_DATA}></LocationSelector>
        </UnaModalForm>
    )
}

export default AbrangenciaForm