import React, { useEffect, useContext, useState } from 'react'
import './style.css'
import { companhiasService } from '@/services/api/companhias-service'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import AsideFilters from '@/react-apps/layouts/components/AsideFilters'
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { setCompanhias } from '@/react-apps/store/reducers/companhias/actions'
import { useDispatch, useSelector } from 'react-redux'
import { SearchControl, ButtonGroupControl, SelectionControl as SelectorNav, SelectionControl } from '@/react-apps/components/SelectorNav'
import { AiOutlineDownload } from 'react-icons/ai'
import { RiFileExcel2Line } from 'react-icons/ri'
import CompanyItem from './Item'
const INITIAL_FILTERS = {
  ativo: []
}

const SELECTORS = [
  { name: "ativo", title: "Ativos" }
]


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

export const ListCompanhiasPage = () => {
    const dispatch = useDispatch()
    const { companhias }  = useSelector<any>(state=>state.companhias)

    useEffect(()=>{
        companhiasService.list({}).then(resp => {
          const payload = { ...resp, data: resp.data.companhias } 
          dispatch(setCompanhias(payload, false))
      })
    },[])


    const handleActions = (key: any) =>{
      console.log(key)
    }
  

    return (
        <div id="companhias-page">
          <div className='app-container'>
                 <ContentGrid>
                    <AsideFilters>
                      <SearchControl title="Nome Fantasia" onClick={()=>console.log("aqui")}/>
                      <SelectorNav 
                          title="Status" 
                          onChange={(payload: SelectionControl.Item[])=>console.log(payload)}  
                          items={STATUS_LIST}></SelectorNav>
                      <SelectorNav  title="CNAES" 
                        onChange={(payload: SelectionControl.Item[])=>console.log(payload)}  
                        items={CNAES_LIST}></SelectorNav>
                      <ButtonGroupControl title="Downloads" content={[
                        {node: (<React.Fragment><RiFileExcel2Line/> Download </React.Fragment>),
                           onClick: () => alert("Aqui deve começar o download")}
                      ]}/>
                    </AsideFilters>

                    <ContentPool 
                        initial_mode="inline"
                        itemComponent={CompanyItem} 
                        list_data={companhias} 
                        onAction={handleActions}>
                    </ContentPool> 
                </ContentGrid>
            </div> 
        </div>
    )
}

export default ListCompanhiasPage

