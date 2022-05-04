import React, { FunctionComponent, useContext } from 'react'
import { GrLocation } from 'react-icons/gr'
import './style.css'
import CepModal from "../../components/CepModal"
import GlobalContenxt from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig } from 'fck-react-dialog'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { global } from "@/services/global-keys"

export const LocationSelector: React.FunctionComponent<any> = ({ onChange }) => {
    return (
        <button className='bl-location-selector' onClick={onChange}>
            <span> <GrLocation/> </span>
            <span> Selecione a sua localidade </span>
        </button>
    )
}
export const LocationBar = () => {

    const history = useHistory()
    const context = useContext(GlobalContenxt);
    const { user_address } = useSelector((state:any)=>state.main)

    const handleModalResult = (r:any) =>{
        if(r == -1) return -1;
        switch(r[0]){
            case "SIGNIN": history.push("login?v=signin"); break;
            case "LOCATION":localStorage.setItem(global.location_storage_key,JSON.stringify(r[1])); break;
            default: return -1;
        }
        return -1;
    }
    const openModal  =() =>{
        context.dialog.push(MakeDialogConfig(
            ({onAction})=>(<CepModal onChange={onAction}></CepModal>),
            handleModalResult, "Selecione a sua localidade "
    ))}
    return (
        <header className='bl-location-bar'>
            <div className='app-container'>
                <nav>
                    <LocationSelector onChange={openModal}></LocationSelector>
                </nav>
            </div>
        </header>
    )
}

export default LocationBar