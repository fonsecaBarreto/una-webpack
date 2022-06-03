import react, { useEffect, useState } from 'react'
import AsideFilters from '@/react-apps/layouts/components/AsideFilters'
import React from 'react'
import { MultipleSelectionControl } from '@/react-apps/components/SelectorNav'

export namespace CompanhiasFiltersNav {
    export type Params = { 
        onChange: (key: string, value: any) => void
        values: any
    }
}

const STATUS_LIST = [ { value: "1", label: "Ativo"}, { value: "0", label: "Inativo"} ]

export const CompanhiasFiltersNav: React.FunctionComponent<CompanhiasFiltersNav.Params> = ({ values, onChange}) =>{
    return (
        <AsideFilters>
            <MultipleSelectionControl 
                title="Compahias" items={STATUS_LIST} max={1} 
                value={!values.ativo ? [] : [{ value: values.ativo }]}
                onChange={(p: any)=> { onChange("FILTER",{'ativo': p[0]?.value ?? null, 'p' : 1})} } >
            </MultipleSelectionControl>   
        </AsideFilters>
  )
}

export default CompanhiasFiltersNav

