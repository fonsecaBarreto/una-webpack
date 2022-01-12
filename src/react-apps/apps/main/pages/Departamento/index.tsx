import React, { useContext, useEffect, useState } from 'react'
import ContentGrid from './ContentGrid'
import NavCategorias from '@/react-apps/components/NavCategorias'
import ProdutctFeed from '@/react-apps/components/ProdutctFeed'


export const DeparamentoPage = () => {
    return (
        <div id="departamento-page">
            <div className='app-container'>
                <ContentGrid>
                  <NavCategorias></NavCategorias>
                    <ProdutctFeed></ProdutctFeed>  
                </ContentGrid>

            </div>
        </div>
    )
}

export default DeparamentoPage