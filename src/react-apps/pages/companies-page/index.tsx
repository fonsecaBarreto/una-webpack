import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import FiltersNav from './FiltersNav'
import { GlobalContext } from "@/react-apps/apps/GlobalContext"
import { MakeOptions }  from 'fck-react-dialog'
import { HandleSearchValues, handleRecords } from "@/react-apps/layouts/components/UnaListingContent/ListingHandlers"
import { companhiasServices } from "@/services/api/companhias-service"
import UnaListingContent from '@/react-apps/layouts/components/UnaListingContent'
import { BlueLagumContext } from '@/react-apps/layouts/BlueLagum'
import { BlAsideLayout } from '@/react-apps/layouts/BlueLagum/AsideModal'
import CompanyForm from '@/react-apps/forms/CompanyForm'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/react-apps/store/reducers/main/actions'

export const ListCompanhiasPage: React.FunctionComponent<any> = ({location, history}) => {

    const dispatch = useDispatch()
    const context = useContext(GlobalContext);
    const layoutContext = useContext(BlueLagumContext)
    const filters: any = HandleSearchValues({ headers: [["ativo", null ],["v", ''],["p", 1]]})
    const { records, metaData, submit, loadTry } = handleRecords({});
    const [ selectedCompany_id, setSelectedCompany_id] = useState(null)

    useEffect(()=>{
      if(!selectedCompany_id) return layoutContext.asideFloat.setRightContent(null)

      // Deve baixar aqui a companhias
      dispatch(setLoading(true))
      companhiasServices.findV2(selectedCompany_id).then((company: any) =>{
        console.log("companhias aqui ", company)
        layoutContext.asideFloat.setRightContent( () => (
          <BlAsideLayout loading={false} title='Companhia' onClose={()=>setSelectedCompany_id(null)}>
            <CompanyForm entry={null} onAction={()=>{}} onData={()=>{}}></CompanyForm>
          </BlAsideLayout> ))   
      }).finally(()=>dispatch(setLoading(false)))
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
          case "OPEN": 
            context.dialog.push(MakeOptions((n)=>{ 
              switch(n){
                case 0:  history.push(`/perfil/companhias/${payload}`); break; 
                case 1:  history.push(`/admin/cotacoes?company_id=${payload}`); break; 
                case 2:  setSelectedCompany_id(payload);break;
              }
              return -1;
            }, [ {label: "Visualizar"}, {label: "Cotações"}, {label: "Editar"}]))
          ;break;
      }
  }

  return (
    <div id="companhias-page">
      <div className='app-container'>
          <ContentGrid>
            <FiltersNav values={filters.values} onChange={(k:string, p: any)=>filters.setValue(p)}/>  
            <UnaListingContent 
                searchText={filters.values['v']} 
                metaData={metaData} 
                records={records} 
                freeze={(loadTry == 0)} 
                onChange={handleActions}>
            </UnaListingContent> 
          </ContentGrid>
        </div> 
    </div>
  )
}

export default ListCompanhiasPage