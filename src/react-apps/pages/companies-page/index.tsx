import React, { useContext, useDebugValue, useEffect, useState } from 'react'
/* import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import FiltersNav from './FiltersNav'
import { HandleSearchValues, handleRecords } from "@/react-apps/layouts/components/UnaListingContent/ListingHandlers"
import { companhiasServices } from "@/services/api/companhias-service"
import UnaListingContent from '@/react-apps/layouts/components/UnaListingContent'
import { BlueLagumContext } from '@/react-apps/layouts/BlueLagum'
import AsideContent from "./modals/AsideContent"
 */
const HEADER =[ ['type',null], ["ativo", null ],["v", ''], ["p", 1] ]

export const ListCompanhiasPage: React.FunctionComponent<any> = ({location, history}) => {
  /*   const layoutContext = useContext(BlueLagumContext)
    const filters: any = HandleSearchValues({ headers: HEADER})
    const { records, metaData, submit, loadTry } = handleRecords({});
    const [ selectedCompany_id, setSelectedCompany_id] = useState(null)

    useEffect(()=>{
      if(!selectedCompany_id) return layoutContext.asideFloat.setRightContent(null)
      layoutContext.asideFloat.setRightContent(<AsideContent onChange={()=>setSelectedCompany_id(null)} company_id={selectedCompany_id}/>)   
    },[selectedCompany_id])

    useEffect(()=>{  
      submit( ()=> {
        return companhiasServices.listV2(filters.values)
        .then(r=>({ ...r, records: r.records.map((p: any)=>({value: p.id, label: p.nomeFantasia})) }))
      }) 
    },[filters.values])

    const handleActions = (key: any, payload: any) =>{
      switch(key){
          case "SUBMIT": filters.setValue({"v": payload});break;
          case "PAGE": filters.setValue({"p": payload});break;
          case "OPEN": setSelectedCompany_id(payload);break;
      }
  } */

  return (
    <div id="companhias-page">
      <div className='app-container'>
          <span> Lucas aqui, estou realocando essa pagina. aguarde!</span>
          {/* <ContentGrid>
            <FiltersNav values={filters.values} onChange={(k:string, p: any)=>filters.setValue(p)}/>  
            <UnaListingContent 
                searchText={filters.values['v']} 
                metaData={metaData} 
                records={records} 
                freeze={(loadTry == 0)} 
                onChange={handleActions}>
            </UnaListingContent> 
          </ContentGrid> */}
        </div> 
    </div>
  )
}

export default ListCompanhiasPage

/*  context.dialog.push(MakeOptions((n)=>{ 
  switch(n){
    case 1:  history.push(`/admin/cotacoes?company_id=${payload}`); break; 
    case 0:  setSelectedCompany_id(payload);break;
  }
  return -1;
}, [  {label: "Editar"}, {label: "Cotações"},])) */