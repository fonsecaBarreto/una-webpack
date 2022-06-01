import React, { useEffect, useState } from 'react'
import AsideFilters from '@/react-apps/layouts/components/AsideFilters'
import { DateControl, MultipleSelectionControl } from '@/react-apps/components/SelectorNav'
import { BudgetState } from '@/react-apps/store/reducers/budgets'
import { setCompanhias } from '@/react-apps/store/reducers/companies'
import { companhiasServices } from '@/services/api/companhias-service'

const STATUS_LIST = [
    { label: "Novo", value: "NEW"},
    { label: "Processando", value:"IN_PROGRESS"},
    { label: "Fechado", value:"CLOSED"},            
    { label: "Sucedido", value:"SUCCEEDED"},
    { label: "Cancelado", value:"CANCELED" }
]

export namespace BudgetFiltersNav {
    export type Params = {
        onChange: (key: string, value: any) => void
        values: any
    }
}

export const BudgetFiltersNav: React.FunctionComponent<BudgetFiltersNav.Params> = ({onChange, values}) =>{
    const [ companies, setCompanies ] = useState<any>([])

    useEffect(()=>{
        companhiasServices.list({}).then((r)=>setCompanies([
                ...(r.data.companies.map((c:any)=> ( { value: c.id, label: c.nomeFantasia})
            ))
        ]))
    },[])
    
    return (
        <AsideFilters>

        {/*     <MultipleSelectionControl 
                title="Status" items={STATUS_LIST} max={1} 
                value={! values.status ? [] : [{ value: values.status }]}
                onChange={(p: any)=> { onChange("FILTER",{'status': p[0]?.value ?? null, 'p' : 1})} } >
            </MultipleSelectionControl>   */}

            <MultipleSelectionControl 
                title="Compahias" items={companies} max={1} 
                value={!values.company_id ? [] : [{ value: values.company_id }]}
                onChange={(p: any)=> { onChange("FILTER",{'company_id': p[0]?.value ?? null, 'p' : 1})} } >
            </MultipleSelectionControl>  
            
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