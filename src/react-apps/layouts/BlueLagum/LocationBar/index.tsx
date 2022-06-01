import React, { useContext, useEffect } from 'react'
import './style.css'
import CepModal from "../../components/CepModal"
import { GlobalContext } from "@/react-apps/apps/GlobalContext"
import { MakeDialogConfig } from 'fck-react-dialog'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SessionLocation } from '@/domain/SessionLocation'
import { setSessionAddress } from '@/react-apps/store/reducers/main/actions'
import LocationPin from "@assets/icons/location-pin.svg"
import DuvidaIcon from "@assets/icons/duvida.svg"
import MenuIcon from "@assets/icons/menu.svg"
export const LocationBar = () => {

    const history = useHistory()
    const context = useContext(GlobalContext);
    const dispatch = useDispatch()
    const { user, session_address } = useSelector((state:any)=>state.main)

    useEffect(()=>captureLocationFromStorage(),[])

    const captureLocationFromStorage = () => {
        var sessionLocation = SessionLocation.get()
        dispatch(setSessionAddress(sessionLocation)) ;
    }

    const captureLocationFromUser= () => {
        const {cep, ibge, cidade, uf } = user.company.addresses[0]
        var sessionLocation  = new SessionLocation(cep, ibge,`${cidade} - ${uf}`)
        dispatch(setSessionAddress(sessionLocation)) ;
    } 

    const openModal  =() =>{
        context.dialog.push(MakeDialogConfig( ({onAction})=>(<CepModal user={user} onChange={onAction}></CepModal>), 
        (r:any) =>{
            switch(r){
                case "SIGNIN" :
                    if(!user){ history.push("login?v=signin")}
                    else { captureLocationFromUser()};
                break;
                case "UPDATE": captureLocationFromStorage(); break;
            };
            return -1;

        },( "Selecione a sua localidade ")
    ))}



    return (
        <header className='bl-location-bar'>
            <div className='app-container'>
                <nav>
                    <button className='bl-location-selector' onClick={openModal}>
                        <img src={LocationPin}></img> 
                        <span>{ session_address ? session_address.label : "Selecione a sua localidade" }</span>
                    </button>

                    <button className='bl-duvida-button' onClick={()=>history.push("/tutoriais")}>
                        <img src={DuvidaIcon}></img> 
                        <span> Preciso de ajuda </span>
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default LocationBar





