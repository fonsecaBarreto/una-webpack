import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import './style.css'
import { companhiasServices } from '@/services/api/companhias-service'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { setCompanhias } from '@/react-apps/store/reducers/companies/actions'
import { useDispatch, useSelector } from 'react-redux'
import CompanyItem from './Item'
import FiltersNav from './FiltersNav'
import GlobalContext from  "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, MakeOptions }  from 'fck-react-dialog'
import CompanhiaViewModal from './modals/CompanhiaView'
import queryString from 'query-string'
import { CompaniesState } from '@/react-apps/store/reducers/companies'
import { json } from 'stream/consumers'

export const ListCompanhiasPage: React.FunctionComponent<any> = ({location, history}) => {

    const dispatch = useDispatch();
    const context = useContext(GlobalContext)
    const { companies_listview } = useSelector<any>((state: any)=>state.companies)

    useEffect(()=>{
      if(!location.search) return
      const parsed = queryString.parse(location.search);
      if(parsed?.id) {
        context.dialog.push(MakeDialogConfig(()=><CompanhiaViewModal companhia_id={parsed.id+""} />,()=>{
          history.push({ search: `` }) 
          return -1
        }, "Companhias"))
      }
    },[location.search])

    const listCompanhias = (filters: any) =>{
      const v = filters.text_value;
      const ativo = filters.status.length == 0 ? "" : filters.status[0].value
      companhiasServices.list({ v, ativo }).then(resp => { dispatch(setCompanhias(resp, false))})
    }

    const filtersChanged = (filters: any) => { listCompanhias(filters);  }
    
    const handleActions = (key: any, payload: any) =>{
      if(key === "options"){
        context.dialog.push(MakeOptions((n)=>{ 
          switch(n){
            case 0:  history.push({ search: `?id=${payload}`  });break;
            case 1:  history.push(`/perfil/${payload}`);break;
          }
          return -1;
         
        }, [{label: "Visualizar"},{label:"Perfil Companhia"}]))
      }
      if(key === "+1") return
    }

    return (
        <div id="companhias-page">
          <div className='app-container'>
                 <ContentGrid>
                    <FiltersNav onChange={filtersChanged}/>
                    <ContentPool 
                        initial_mode="inline"
                        itemComponent={CompanyItem} 
                        list_data={companies_listview} 
                        dataAlias={"companies"}
                        onAction={handleActions}>
                    </ContentPool> 
                </ContentGrid>
            </div> 
        </div>
    )
}

export default ListCompanhiasPage

