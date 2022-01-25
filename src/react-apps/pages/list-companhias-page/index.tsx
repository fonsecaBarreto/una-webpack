import React, { useEffect, useContext, useState } from 'react'
import './style.css'
import { companhiasService } from '@/services/api/companhias-service'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import AsideFilters from '@/react-apps/layouts/components/AsideFilters'
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { setCompanhias } from '@/react-apps/store/reducers/departaments/actions'
import { useDispatch, useSelector } from 'react-redux'

const INITIAL_FILTERS = {
  ativo: []
}

const SELECTORS = [
  { name: "ativo", title: "Ativos" }
]

const CompanyItem = () =>{
  return (
    <div>

    </div>

  )
}

export const ListCompanhiasPage = () => {
    const dispatch = useDispatch()
    const { companhias }  = useSelector(state=>state.departamentos)

    useEffect(()=>{
        companhiasService.list({}).then(data => {
          console.log(data)
            dispatch(setCompanhias(data))})
    },[])
  
    const more = () =>{
      console.log("more")
    }

    return (
        <div id="companhias-page">
          <div className='app-container'>
                 <ContentGrid>

    
                    <AsideFilters>
                      <span> Fazendo um teste aqui </span>
                    </AsideFilters>
                  
                  {/*}
                    <ContentPool 
                        component={ ({item_data, key})=>(<CompanyItem></CompanyItem>)} 
                        list_data={[]} 
                        onAction={more}>
                    </ContentPool> */}
                </ContentGrid>
            </div> 
        </div>
    )
}

export default ListCompanhiasPage

