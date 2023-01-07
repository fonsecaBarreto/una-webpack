import React from "react"
import './styles.css'
import { images } from "@assets/manifest"

export const WhatsAppFloatButton: React.FunctionComponent<any> = () => {

    const handleClick = () =>{
        window.open('https://wa.me/5522992317557', '_blank');
    }

    return (
        <div className='whatsapp-float-button'>
            <button  aria-label="whatsapp support button" onClick={handleClick}>
                 <img alt="whatsapp" src={images.whatsApp}></img>  
            </button>
        </div>
    )
}

export default WhatsAppFloatButton;