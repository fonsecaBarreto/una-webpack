import React, { useState, useEffect, ReactNode } from 'react'
import './style.css'
import { useWindowSize } from 'fck-components/lib/utils/hooks'
import BlueLagumAsideModal from '@/react-apps/layouts/BlueLagum/AsideModal'

export namespace FiltersAsideNav {
    export type Params = {
        children?: ReactNode
    }
}

export const FiltersAsideNav: React.FunctionComponent<FiltersAsideNav.Params> = ({ children }) => {

    const { width } = useWindowSize()
    const [ showFilters, setShowFilters ] = useState<boolean>(false)

    return (
        <aside className='filter-aside-nav'>
   
            {   width > 960 ? children
            :   <button className='filter-aside-nav-button' onClick={()=>setShowFilters(true)}>Filtros</button>  }
            <BlueLagumAsideModal className='mobile-only'
                content={ () => {children} }
                footer={<span></span> }
                title='Filtros'
                onClose={()=>setShowFilters(false)}
                show={showFilters}
                dir='left' >
            </BlueLagumAsideModal>  
        </aside> 
    )
}
export default FiltersAsideNav
