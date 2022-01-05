import React from 'react'
import NavCategorias from '@/react-apps/components/NavCategorias'
import ContentGrid from './ContentGrid'


export const DeparamentoPage = () =>{
    return (
        <div id="departamento-page">
            <div className='app-container'>

                <div>
                    <span>{" Exemplo >" }</span> 
                    <span>{" Exemplo >" }</span>
                    <span>{" Exemplo >" }</span>
                    <span>{" Exemplo >" }</span> 
                </div>
                <ContentGrid>
             
                    <NavCategorias></NavCategorias>
             
             
                    <div>
                        Produtos aca
                    </div>
          
                 </ContentGrid>
                {/* 
                <NavCategorias></NavCategorias> */}
            </div>
        </div>
    )
}

export default DeparamentoPage