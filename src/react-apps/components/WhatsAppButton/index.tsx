import React from "react"
import './styles.css'
import WhatsAppIcon from "@assets/icons/whatsapp.svg"

export const WhatsAppFloatButton: React.FunctionComponent<any> = () => {

    const handleClick = () =>{
        window.open('https://wa.me/5522992317557', '_blank');
    }

    return (
        <div className='whatsapp-float-button'>
            <button onClick={handleClick}>
                <img src={WhatsAppIcon}></img>
            </button>
        </div>
    )
}

export default WhatsAppFloatButton;