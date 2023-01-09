import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import CepModal from "../../components/CepModal"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SessionLocation } from '@/domain/SessionLocation'
import { setSessionAddress } from '@/react-apps/store/reducers/main/actions'
import LocationPin from "@assets/icons/location-pin.svg"
import DuvidaIcon from "@assets/icons/duvida.svg"
import FantasticRootModal from '@/react-apps/components/FantasticRootModal'


export const LocationBar = () => {
    const [ showLocationModal, setShowLocationModal] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const { user, session_address } = useSelector((state:any)=>state.main)

    useEffect(()=>captureLocationFromStorage(),[])

    const captureLocationFromStorage = () => {
        var sessionLocation = SessionLocation.get()
        dispatch(setSessionAddress(sessionLocation)) ;
    }

    const captureLocationFromUser= () => {
        if(!user.addresses) alert('Nenhum endereço cadastrado para esse usuario.')
        const {cep, ibge, cidade, uf } = user.company.addresses[0]
        var sessionLocation  = new SessionLocation(cep, ibge,`${cidade} - ${uf}`)
        dispatch(setSessionAddress(sessionLocation)) ;
    } 

    const handleModalChange = (r: any) =>{
        switch(r){
            case "SIGNIN" :
                if(!user){ history.push("login?v=signin")}
                else { captureLocationFromUser()};
            break;
            case "UPDATE": 
                captureLocationFromStorage(); 
            break;
        }
        
        setShowLocationModal(false);
    }


    return (
        <header className='bl-location-bar'>
            <div className='app-container'>
                <nav>
                    <button className='bl-location-selector' onClick={() => setShowLocationModal(true)}>
                        <img src={LocationPin} alt="pin de localização"></img> 
                        <span>{ session_address ? session_address.label : "Selecione a sua localidade" }</span>
                    </button>

                    <button className='bl-duvida-button' onClick={()=>history.push("/tutoriais")}>
                        <img src={DuvidaIcon} alt="icone de duvida (?)"></img> 
                        <span> Preciso de ajuda </span>
                    </button>
                </nav>
            </div>

            <FantasticRootModal show={showLocationModal}>
                <CepModal user={user} onChange={handleModalChange}></CepModal> 
            </FantasticRootModal>
        </header>
    )
}

export default LocationBar





