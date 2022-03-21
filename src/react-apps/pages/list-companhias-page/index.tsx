import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import FiltersNav from './FiltersNav'
import GlobalContext from  "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, MakeOptions }  from 'fck-react-dialog'
import CompanhiaViewModal from './modals/CompanhiaView'
import { useDispatch, useSelector } from 'react-redux'
import { CompaniesState, setCompanhias } from '@/react-apps/store/reducers/companies'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import { companhiasServices } from '@/services/api/companhias-service'
import CompaniesFeed from './CompaniesFeed'


export const SEARCH_HEADER= { status:"array", v: "string", p: "string" };

export const ListCompanhiasPage: React.FunctionComponent<any> = ({location, history}) => {
  
    const dispatch = useDispatch()
    const context = useContext(GlobalContext)
    const { parsed: parsedSearch, parsedParam, pushToHistory } = UseSearchAdapter({ search: SEARCH_HEADER, param:"company_id" })

    useEffect(()=>{ if(parsedSearch){ handleLoad()} },[parsedSearch])
    const handleLoad= () => { companhiasServices.list({ ...parsedSearch, ...parsedParam }).then( r => dispatch(setCompanhias(r, false))) }

    useEffect(()=>{
      if(parsedParam?.["company_id"]){
        context.dialog.push(MakeDialogConfig(()=><CompanhiaViewModal companhia_id={parsedParam?.["company_id"]} />,()=>{
          pushToHistory({value: ""}, "company_id");
          return -1;
        }, "Companhias"))
      }
    
    },[parsedParam]) 


    const handleActions = (key: any, payload: any) =>{
      if(key === "options"){
        context.dialog.push(MakeOptions((n)=>{ 
          switch(n){
            case 0:  pushToHistory({value: payload}, "company_id"); break;
            case 1:  history.push(`/perfil/${payload}`); break; 
          }
          return -1;
        }, [ {label: "Visualizar"}, {label: "Abrir"},
        ]))
      }
      if(key === "p") {
        pushToHistory(payload+"", 'p')
      }
    }

    return (
        <div id="companhias-page">
          <div className='app-container'>
              <ContentGrid>
                   <FiltersNav onChange={pushToHistory} values={parsedSearch} company_id={parsedParam?.["company_id"] ?? ""}/> 
                   <CompaniesFeed onAction={handleActions} > </ CompaniesFeed>
              </ContentGrid>
            </div> 
        </div>
    )
}

export default ListCompanhiasPage