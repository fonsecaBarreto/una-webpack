import React, { useEffect, useState } from 'react'
import AsideFilters from '@/react-apps/layouts/components/AsideFilters'
import { DateControl } from '@/react-apps/components/SelectorNav'
import { BudgetState } from '@/react-apps/store/reducers/budgets'

export namespace BudgetFiltersNav {
    export type Params = {
        onChange: (filters: BudgetState.Filters) => void
    }
}

const INITIAL_FILTERS: BudgetState.Filters = {
    company: [],
    idate: "1997-09-02",
    ldate: new Date().toISOString().split('T')[0],
    user: []
}

export const BudgetFiltersNav: React.FunctionComponent<BudgetFiltersNav.Params> = ({onChange}) =>{
    const [ count, setCount ] = useState(0)
    const [ filters, setFilters ] = useState<BudgetState.Filters>({...INITIAL_FILTERS})

    useEffect(()=>{ 
        if(count === 0) { return setCount(1)} 
        onChange(filters)
    },[filters])

    return (
        <AsideFilters>
            <DateControl 
                initial_value={filters.idate}
                onChange={(v: any)=>setFilters( prev => ({...prev, idate: v }))}  
                title="Data Inicial"></DateControl>
            <DateControl 
                initial_value={filters.ldate}
                onChange={(v: any)=>setFilters( prev => ({...prev, ldate: v }))}  
                title="Data Limite"></DateControl>
        </AsideFilters>
  )
}

export default BudgetFiltersNav