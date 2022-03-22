import React, { useState, useEffect, ReactNode } from 'react'
import './style.css'
import { useWindowSize } from 'fck-components/lib/utils/hooks'
import BlueLagumAsideModal from '@/react-apps/layouts/BlueLagum/AsideModal'
import { BsFillFilterSquareFill } from 'react-icons/bs'

export namespace FiltersAsideNav {
    export type Params = {
        children?: ReactNode
        toggle?: boolean
    }
}

export const FiltersAsideNav: React.FunctionComponent<FiltersAsideNav.Params> = ({ children, toggle = false }) => {

    const { width } = useWindowSize()
    const [ showFilters, setShowFilters ] = useState<boolean>(true)
    
    useEffect(()=>{ setShowFilters(!showFilters) },[toggle]);

    return (
        <aside className='filter-aside-nav'>

            {   width > 960 &&  <span>  {children}  </span>}

            {/*  :  <button className='filter-aside-nav-button' onClick={()=>setShowFilters(true)}> <BsFillFilterSquareFill/> </button>  } */ }

            <BlueLagumAsideModal className='mobile-only' show={showFilters}  onClose={()=>setShowFilters(false)}
                content={ children }
                footer={<span></span> }
                title='Filtros'
                dir='left' >
            </BlueLagumAsideModal>  
        </aside> 
    )
}
export default FiltersAsideNav


