import React, { useEffect, useState } from 'react'
import AsideFilters from '@/react-apps/layouts/components/AsideFilters'
import { DateControl } from '@/react-apps/components/SelectorNav'

export namespace BudgetFiltersNav {
    export type Params = {
        onChange: (key: string, value: any) => void
        values: any
    }
}

export const BudgetFiltersNav: React.FunctionComponent<BudgetFiltersNav.Params> = ({onChange, values}) =>{
    return (
        <AsideFilters> 
            <DateControl 
                initial_value={values.initial_date}
                onChange={(v: any)=>onChange("FILTER",{"initial_date": v })}  
                title="Data Inicial"></DateControl>
            <DateControl 
                initial_value={values.end_date}
                onChange={(v: any)=>onChange("FILTER",{"end_date": v })}  
                title="Data Limite"></DateControl>
        </AsideFilters>
  )
}

export default BudgetFiltersNav