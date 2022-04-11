import react, { useEffect, useState } from 'react'
import AsideFilters from '@/react-apps/layouts/components/AsideFilters'
import { SearchControl, SelectionControl as SelectorNav } from '@/react-apps/components/SelectorNav'
import React from 'react'
import MultipleSelectionControl from '@/react-apps/components/SelectorNav/MultipleSelectionControl'

export namespace CompanhiasFiltersNav {
    export type Params = { values: any, onChange: any, company_id: string }
}

const STATUS_LIST = [ { value: "1", label: "Ativo"}, { value: "0", label: "Inativo"} ]

export const CompanhiasFiltersNav: React.FunctionComponent<CompanhiasFiltersNav.Params> = ({ values, company_id, onChange}) =>{
    return (
        <AsideFilters loading={false}>
            { (!values) ? ( <span> Carregando... </span> ) :(
                <MultipleSelectionControl 
                    title="Status" items={STATUS_LIST} max={1} 
                    value={ values["status"].map((v:string)=>({value: v}))}
                    onChange={(payload: any)=>onChange({ status: payload.map((v:any)=>v.value)})} >
                </MultipleSelectionControl>  
            )}
        </AsideFilters>
  )
}

export default CompanhiasFiltersNav

