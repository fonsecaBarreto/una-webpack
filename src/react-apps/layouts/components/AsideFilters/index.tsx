import React, { useState, useEffect, ReactNode, useContext } from 'react'
import './style.css'
import { BlAsideLayout } from '@/react-apps/layouts/BlueLagum/AsideModal'
import { BlueLagumContext } from "@/react-apps/layouts/BlueLagum"
import UseWindowSize from '@/react-apps/components/utils/UseWindowSize'
import { ReactReduxContext } from 'react-redux'

export namespace FiltersAsideNav {
    export type Params = {
        children?: ReactNode
        allowedToShow?: boolean,
        onChange?: any,
        isLoading?: boolean
    }
}

export const FiltersAsideNav: React.FunctionComponent<FiltersAsideNav.Params> = ({ isLoading=false, children, allowedToShow = false, onChange }) => {

    const { width } = UseWindowSize()
    const [ showFilters, setShowFilters ] = useState<boolean>(false)
    const layoutContext = useContext(BlueLagumContext)
    useEffect(()=>{ setShowFilters(allowedToShow) },[allowedToShow]);
   
    useEffect(()=>{
        if(width > 960) layoutContext.asideFloat.setContent(null);
        else {
            if(showFilters) { layoutContext.asideFloat.setContent(()=>( 
                <BlAsideLayout loading={isLoading} title='Filtros' onClose={()=>onChange && onChange(-1)}>
                    {children}   
                </BlAsideLayout>)
            )}
            else { layoutContext.asideFloat.setContent(null) }
        }
    },[showFilters, width, isLoading])

    return (
        <aside className={`filter-aside-nav`}>
            {children}
        </aside>  
    )
}
export default FiltersAsideNav

