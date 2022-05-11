import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import FiltersNav from './FiltersNav'
import { GlobalContext } from "@/react-apps/apps/GlobalContext"
import { MakeDialogConfig, MakeOptions }  from 'fck-react-dialog'
import CompanhiaViewModal from './modals/CompanhiaView'
import { useDispatch } from 'react-redux'
import { setCompanhias } from '@/react-apps/store/reducers/companies'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import { companhiasServices } from '@/services/api/companhias-service'
import CompaniesFeed from './CompaniesFeed'

export const SEARCH_HEADER= {
  params: [ "company_id" ],
  search: [ "status", "v", "p"]
};

export const ListCompanhiasPage: React.FunctionComponent<any> = ({location, history}) => {

    const dispatch = useDispatch()
    const context = useContext(GlobalContext)
    const { parsedSearch, parsedParams, pushToHistory } = UseSearchAdapter({ header: SEARCH_HEADER })

    useEffect(()=>{ if(parsedSearch){ handleLoad()} },[parsedSearch])
   
    useEffect(()=>{
      if(!parsedParams?.company_id) return;
      showCompanyModal();
    },[parsedParams]) 

    const showCompanyModal = () =>{
      context.dialog.push(MakeDialogConfig(()=><CompanhiaViewModal companhia_id={parsedParams?.["company_id"]} />,()=>{
        pushToHistory({"company_id": []});
        return -1;
      }, "Companhias"))
    }

    const handleLoad= () => { companhiasServices.list({ ...parsedSearch }).then( r => dispatch(setCompanhias(r, false))) }

    const handleActions = (key: any, payload: any) =>{
      console.log(payload)
      switch(key){
        case "OPTIONS": {
          context.dialog.push(MakeOptions((n)=>{ 
            switch(n){
              case 0:  pushToHistory({"company_id": [payload]}); break;
              case 1:  history.push(`/perfil/companhias/${payload}`); break; 
            }
            return -1;
          }, [ {label: "Visualizar"}, {label: "Abrir"}]))
        };break;
        case "SET_PAGE": pushToHistory({'p': payload+""});break;
      }
    }

    return (
        <div id="companhias-page">
          <div className='app-container'>
              <ContentGrid>
                   <FiltersNav onChange={pushToHistory} values={parsedSearch} company_id={parsedParams?.["company_id"] ?? ""}/> 
                   <CompaniesFeed onAction={handleActions} > </ CompaniesFeed>
              </ContentGrid>
            </div> 
        </div>
    )
}

export default ListCompanhiasPage