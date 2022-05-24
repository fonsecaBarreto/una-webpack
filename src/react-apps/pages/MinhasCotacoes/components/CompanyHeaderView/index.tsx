import * as React from 'react';
import "./style.css"

import MapImage from '@assets/images/buildings.png'
import GoogleMapAdapter from '@/react-apps/components/GoogleMap';
import { global } from "@/services/global-keys"
import { GepCepInfo } from '@/services/google-services';
export const CompanyHeaderView:React.FunctionComponent<any> = ({company}) =>{

    const [ coordinates, setCoordinates ] = React.useState()
    React.useEffect(()=> { if(company) handleEntry(company?.addresses[0].cep) },[company])
    const handleEntry = async (cep: any) =>{
        console.log("cep", cep)
        if(!cep) return
        if(cep){
            let result= await GepCepInfo(cep);
            setCoordinates(result.geometry.location)
        }
    }

    return (
        <div className='cotacoes-una-header-view'>
            <div className='cuhb-imagevp'>
                <GoogleMapAdapter googleMapsApiKey={global.google_api_key} coordinates={coordinates}></GoogleMapAdapter>
            </div>
            <div className='cuhb-company-info'>
                <span> {company.nomeFantasia}</span>
                <span> {company.razaoSocial}</span>
            </div>

            <span> </span> 
        </div>
    )
}
export default CompanyHeaderView