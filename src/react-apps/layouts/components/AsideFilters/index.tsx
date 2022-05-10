import React, { useState, useEffect, ReactNode, useContext } from 'react'
import './style.css'
import { useWindowSize } from 'fck-components/lib/utils/hooks'
import { BlAsideLayout } from '@/react-apps/layouts/BlueLagum/AsideModal'
import { BlueLagumContext } from "@/react-apps/layouts/BlueLagum"

export namespace FiltersAsideNav {
    export type Params = {
        children?: ReactNode
        allowedToShow?: boolean,
        onChange: any
    }
}

export const FiltersAsideNav: React.FunctionComponent<FiltersAsideNav.Params> = ({ children, allowedToShow = false, onChange }) => {

    const { width } = useWindowSize()
    const [ showFilters, setShowFilters ] = useState<boolean>(true)
    const layoutContext = useContext(BlueLagumContext)
    useEffect(()=>{ setShowFilters(allowedToShow) },[allowedToShow]);
   
    useEffect(()=>{
        if(width > 960) layoutContext.asideFloat.setContent(null);
        else {
            if(showFilters) { layoutContext.asideFloat.setContent(()=>( 
                <BlAsideLayout title='Filtros' onClose={()=>onChange(-1)}>{children}</BlAsideLayout>)
            )}
            else { layoutContext.asideFloat.setContent(null) }
        }
    },[showFilters, width])

    return (
        <aside className={`filter-aside-nav ${!false ? ""  : "filters-is-loading"}`}>
            {children}
        </aside>  
    )
}
export default FiltersAsideNav

