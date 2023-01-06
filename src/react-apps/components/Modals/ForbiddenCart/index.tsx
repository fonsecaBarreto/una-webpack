import React, { FC } from 'react'
import './style.css'
export const ForbiddenCartModal: FC<any> = ({onChange}) =>{ 
    return (
        <div className='forbidden-cart-modal'>        
          <h5> Cadastre-se para descobrir todas as vantagens </h5>   
            <button onClick={()=>onChange(2)} className='una-submit-button'> CADASTRAR-SE </button>
            <button onClick={()=>onChange(1)} className='una-submit-button light'> Agora não </button>    
        </div>
    )
}




export default ForbiddenCartModal