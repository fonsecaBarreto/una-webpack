import React, { FC } from 'react'
import './style.css'
import NonUserImage from "@/public/assets/images/non-user.webp"

export const ForbiddenCartModal: FC<any> = ({onAction}) =>{ 
    return (
        <div className='forbidden-cart-modal'>
             
            <img src={NonUserImage}></img>            
            <h3> Você precisa estar logado para acessar o carrinho </h3>   
            <button onClick={()=>onAction(2)} className='una-submit-button'> CADASTRAR-SE </button>
            <button onClick={()=>onAction(1)} className='una-submit-button light'> Entrar </button>      
        </div>
    )
}

export default ForbiddenCartModal