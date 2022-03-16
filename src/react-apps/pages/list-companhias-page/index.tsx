import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import './style.css'
import { companhiasServices } from '@/services/api/companhias-service'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { CompaniesState, setCompanhias } from '@/react-apps/store/reducers/companies'
import { useDispatch, useSelector } from 'react-redux'
import CompanyItem from './Item'
import FiltersNav from './FiltersNav'
import GlobalContext from  "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, MakeOptions }  from 'fck-react-dialog'
import CompanhiaViewModal from './modals/CompanhiaView'
import queryString from 'query-string'

export const ListCompanhiasPage: React.FunctionComponent<any> = ({location, history}) => {

    const dispatch = useDispatch();
    const context = useContext(GlobalContext)
    const ListData: any = useSelector<CompaniesState>((state: any)=>state.companies)

 /*    useEffect(()=>{ if(ListData.sync == 0 ){ listCompanhias({}) } },[]) */

    /* queries change */
    useEffect(()=>{
      if(!location.search) return
      const parsed = queryString.parse(location.search);
      if(parsed?.id) {
        context.dialog.push(MakeDialogConfig(()=><CompanhiaViewModal companhia_id={parsed.id+""} />,()=>{
          history.push({ search: `` }); return -1;
        }, "Companhias"))
      }
    },[location.search])

    /* Listar Companhias */
    const listCompanhias = (filters: any) =>{
      companhiasServices.list(filters).then(resp => { dispatch(setCompanhias(resp, false))})
    }
    /* actions */
    const handleActions = (key: any, payload: any) =>{
      if(key === "options"){
        context.dialog.push(MakeOptions((n)=>{ 
          switch(n){
            case 0:  history.push({ search: `?id=${payload}`  });break;
            case 1:  history.push(`/perfil/${payload}`);break;
          }
          return -1;
        }, [
          {label: "Visualizar"},
          {label: "Abrir"},
        ]))
      }
      if(key === "+1") return
    }

    return (
        <div id="companhias-page">
          <div className='app-container'>
                 <ContentGrid>
                    <FiltersNav onChange={listCompanhias}/>
                    <ContentPool 
                        initial_mode="inline"
                        itemComponent={CompanyItem} 
                        list_data={ListData} 
                        dataAlias={"companies"}
                        onAction={handleActions}>
                    </ContentPool> 
                </ContentGrid>
            </div> 
        </div>
    )
}

export default ListCompanhiasPage

