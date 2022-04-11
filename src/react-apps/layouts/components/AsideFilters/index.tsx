import React, { useState, useEffect, ReactNode } from 'react'
import './style.css'
import { useWindowSize } from 'fck-components/lib/utils/hooks'
import BlueLagumAsideModal from '@/react-apps/layouts/BlueLagum/AsideModal'

export namespace FiltersAsideNav {
    export type Params = {
        children?: ReactNode
        toggle?: boolean
        loading: boolean
    }
}

export const FiltersAsideNav: React.FunctionComponent<FiltersAsideNav.Params> = ({ loading, children, toggle = false }) => {

    const { width } = useWindowSize()
    const [ showFilters, setShowFilters ] = useState<boolean>(true)
    useEffect(()=>{ setShowFilters(!showFilters) },[toggle]); 
    return (
        <aside className={`filter-aside-nav ${!loading ? ""  : "filters-is-loading"}`}>
            {   width > 950 &&  <span>  {children}  </span>} 
            <BlueLagumAsideModal loading={loading} className='mobile-only' show={showFilters}  onClose={()=>setShowFilters(false)}
                content={ children }
                footer={<span></span> }
                title='Filtros'
                dir='left' >
            </BlueLagumAsideModal>  
        </aside> 
    )
}
export default FiltersAsideNav


