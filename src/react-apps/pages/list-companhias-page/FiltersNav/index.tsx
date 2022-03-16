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

const INITIAL_FILTERS: any = { ativo: [], v: "", test: [] }
  
const STATUS_LIST = [ { value: "1", label: "Ativo"}, { value: "0", label: "Inativo"} ]
const TESTANDO = [ { value: "0", label: "primeiro"}, { value: "1", label: "Segundo"}, { value: "2", label: "Terceiro"}, { value: "3", label: "Quarto"}  ]
  
export const CompanhiasFiltersNav: React.FunctionComponent<CompanhiasFiltersNav.Params> = ({onChange}) =>{

    const [ count, setCount ] = useState(0);
    const [ filters, setFilters ] = useState<any>({...INITIAL_FILTERS});

    useEffect(()=>{ 
        if(count === 0) { return setCount(1)} 
        onChange(filters);
    },[filters])
    
    return (
        <AsideFilters>

            <SearchControl title="Pesquisa" onClick={ (v:any) => setFilters((prev:any)=>({...prev, v}))}/>

            <SelectorNav 
                max={1}
                title="Status" 
                onChange={(v:any[]) => setFilters((prev:any)=>({...prev, ativo: v.length == 0 ? "" : v[0].value })) }
                items={STATUS_LIST}>
            </SelectorNav>

           {/*  <SelectorNav 
                title="Teste" 
                max={2}
                onChange={(v:any) => console.log("-->", v) }
                items={TESTANDO}>
            </SelectorNav> */}

        
        </AsideFilters>
  )
}

export default CompanhiasFiltersNav

            //setFilters((prev:any)=>({...prev, ativo: v}))
/* 
    <ButtonGroupControl  title="Downloads" content={[
    {node: (<React.Fragment><RiFileExcel2Line/> Download Excel </React.Fragment>),
        onClick: () => alert("Aqui deve começar o download")}
    ]}/> 
*/