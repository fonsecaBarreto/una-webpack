import React, { FC } from 'react'
import './style.css'
export const ForbiddenCartModal: FC<any> = ({onAction, where}) =>{ 
    return (
        <div className='forbidden-cart-modal'>        
            <h5> Cadastre-se para descobrir todas as vantagens </h5>   
            <button onClick={()=>onAction(2)} className='una-submit-button'> CADASTRAR-SE </button>
            <button onClick={()=>onAction(1)} className='una-submit-button light'> Entrar </button>      
        </div>
    )
}




export default ForbiddenCartModal