import react, { useEffect, useState } from 'react'
import AsideFilters from '@/react-apps/layouts/components/AsideFilters'
import { SearchControl, ButtonGroupControl, SelectionControl as SelectorNav, SelectionControl } from '@/react-apps/components/SelectorNav'
import { AiOutlineDownload } from 'react-icons/ai'
import { RiFileExcel2Line } from 'react-icons/ri'
import React from 'react'

const INITIAL_FILTERS = {
    status: [],
    text_value: ""
}
  
const STATUS_LIST = [
    { value: "1", label: "Ativo"},
    { value: "2", label: "Inativo"}
]
  
  const CNAES_LIST = [
    { value: "1", label: "Examplo 1 de CNAE"},
    { value: "2", label: "Examplo 2 de CNAE"},
    { value: "3", label: "Examplo 3 de CNAE"},
    { value: "4", label: "Examplo 4 de CNAE"},
    { value: "5", label: "Examplo 5 de CNAE"},
  ]

export namespace CompanhiasFiltersNav {
    export type Params = {
        onChange: (filters: any) => void
    }
}

export const CompanhiasFiltersNav: React.FunctionComponent<CompanhiasFiltersNav.Params> = ({onChange}) =>{

    const [ filters, setFilters ] = useState<any>({...INITIAL_FILTERS})
    const setTextValue = (v:string) => setFilters((prev: any)=>({...prev, text_value: v}))
    const setStatus = (v:any) => setFilters((prev: any)=>({...prev, status: v}))

    useEffect(()=>{onChange(filters) },[filters])
    
    return (
        <AsideFilters>

        <SearchControl title="Nome Fantasia" onClick={setTextValue}/>

        <SelectorNav 
            radio={true}
            title="Status" 
            onChange={setStatus}  
            items={STATUS_LIST}></SelectorNav>
        <SelectorNav  title="CNAES" 

        onChange={(payload: SelectionControl.Item[])=>console.log(payload)}  
        items={CNAES_LIST}></SelectorNav>
        <ButtonGroupControl  title="Downloads" content={[
        {node: (<React.Fragment><RiFileExcel2Line/> Download Excel </React.Fragment>),
            onClick: () => alert("Aqui deve começar o download")}
        ]}/>
    </AsideFilters>
  )
}

export default CompanhiasFiltersNav