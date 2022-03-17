import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import CompanyItem from './Item'
import FiltersNav from './FiltersNav'
import GlobalContext from  "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, MakeOptions }  from 'fck-react-dialog'
import CompanhiaViewModal from './modals/CompanhiaView'
import queryString from 'query-string'
import { CompanyListState } from './ListState'

export const ListCompanhiasPage: React.FunctionComponent<any> = ({location, history}) => {

    const { listData, handleLoad }  = CompanyListState()
    const context = useContext(GlobalContext)

    useEffect(()=>{
      if(!location.search) return
      const parsed = queryString.parse(location.search);
      if(parsed?.id) {
        context.dialog.push(MakeDialogConfig(()=><CompanhiaViewModal companhia_id={parsed.id+""} />,()=>{
          history.push({ search: `` }); return -1;
        }, "Companhias"))
      }
    },[location.search]) 

    /* actions */
    const handleActions = (key: any, payload: any) =>{
      if(key === "options"){
        context.dialog.push(MakeOptions((n)=>{ 
          switch(n){
            case 0:  history.push({ search: `?id=${payload}`  });break;
            case 1:  history.push(`/perfil/${payload}`);break;
          }
          return -1;
        }, [ {label: "Visualizar"}, {label: "Abrir"},
        ]))
      }
      if(key === "+1") return 
    } 

    return (
        <div id="companhias-page">
          <div className='app-container'>
              <ContentGrid>
                  <FiltersNav onChange={handleLoad}/> 
                  <ContentPool 
                      initial_mode="inline"
                      itemComponent={CompanyItem} 
                      list_data={listData} 
                      dataAlias={"companies"}
                      onAction={handleActions}>
                  </ContentPool> 
              </ContentGrid>
            </div> 
        </div>
    )
}

export default ListCompanhiasPage

