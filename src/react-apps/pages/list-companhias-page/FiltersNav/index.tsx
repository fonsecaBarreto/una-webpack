import react, { useEffect, useState } from 'react'
import AsideFilters from '@/react-apps/layouts/components/AsideFilters'
import { SearchControl, SelectionControl as SelectorNav } from '@/react-apps/components/SelectorNav'
import React from 'react'
import { CompaniesState } from '@/react-apps/store/reducers/companies'

export namespace CompanhiasFiltersNav {
    export type Params = {
        onChange: (filters: CompaniesState.Filters) => void
    }
}

const INITIAL_FILTERS: any = { ativo: [], v: "" }
  
const STATUS_LIST = [ { value: "1", label: "Ativo"}, { value: "0", label: "Inativo"} ]



export const CompanhiasFiltersNav: React.FunctionComponent<CompanhiasFiltersNav.Params> = ({onChange}) =>{

    const [ count, setCount ] = useState(0);
    const [ filters, setFilters ] = useState<any>({ ...INITIAL_FILTERS });

    useEffect(()=>{ 
        if(count === 0) { return setCount(1) } 
        //onChange(filters); //v.length == 0 ? "" : v[0].value
    },[filters])
    
    return (
        <AsideFilters>
            <SearchControl initial_value={filters["v"]} title="Pesquisa" onClick={ (v:any) => setFilters((prev:any)=>({...prev, v}))}/>
            
            <SelectorNav title="Status" 
                initial_value={filters["ativo"]}
                max={1}
                onChange={(v:any[]) => setFilters((prev:any)=>({...prev, ativo: v })) }
                items={STATUS_LIST}>
            </SelectorNav>

            {JSON.stringify(filters)}
        </AsideFilters>
  )
}

export default CompanhiasFiltersNav

