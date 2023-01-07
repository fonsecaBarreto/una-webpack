import React, { useEffect, useMemo, useState } from 'react';
import "./style.css"
import "../common-panel.css"
import { useSelector } from 'react-redux';
import CompanyHeaderView from '../components/CompanyHeaderView';
import UnaListingContent from '@/react-apps/layouts/components/UnaListingContent';
import { budgetServices } from '@/services/api/budget-service';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string'
import GlobalContext from '@/react-apps/apps/GlobalContext';
import { BudgetItem } from './components/Item';
import GeneralBreadCrumbs from '@/react-apps/layouts/components/GeneralBreadCrumbs';


export const useSearch = () => {
    const history = useHistory()
    const { search } = useLocation();

    const search_resolved = useMemo( () => {
      const query = new URLSearchParams(search);
      let page = query.get("page");
      return {
        page: page && Number(page) > 0 ? Number(page) : 1,
        search_query: query.get("search_query") ?? ""
      }
    }, [search]) 

    const setSearch = (payload: any) =>{
        history.replace({ search: qs.stringify({...payload})})
    }
    return { search_resolved, setSearch };
  }


const CompaniesBudgets:React.FunctionComponent<{company_id:string}> = ({company_id}) =>{

    const context = React.useContext(GlobalContext)
    const [ forceToFetch, setForceToFetch ] = useState(true)
    const [ isFetching, setIsFetching ] = useState(false)
    const [ records, setRecords ] = useState<any[]>([])
    const [ metadata, setMetadata ] = useState<any>([])
    const { search_resolved, setSearch } = useSearch()


    useEffect(()=>{ if(forceToFetch === true) fetchBudgets(); }, [forceToFetch])

    const fetchBudgets = (): any =>{
        setForceToFetch(false);
        setIsFetching(true);
        budgetServices.list({})
          .then((r)=>{
            setMetadata(r._metadata);
            setRecords(prev => r._metadata.page === 1 ? r.records : [ ...prev, ...r.records ]);
          })
          .finally(()=>{
            setIsFetching(false);
          })
    }


    const handleActions = (key: any, payload: any) =>{
       /*  switch(key){
            case "PAGE": filters.setValue({"p": payload});break;
            case "OPEN": setShowBudget(payload);break
            case "SUBMIT":{ setShowBudget(payload) };break;
        } */
    } 
        
    return (
        <div className='app-container'>
            <UnaListingContent 
                itemComponent={BudgetItem}
                metaData={metadata} 
                records={records} 
                freeze={isFetching} 
                onChange={handleActions}>
            </UnaListingContent> 
        </div>
    )
}

export const MinhasCotacoes: React.FunctionComponent<any> = ({history}) =>{
    const { user }:any = useSelector<any>(state=> state.main)
    return (
        <div id="minhas-cotacoes-page" >
            <div className='app-container' >
                <header >
                    <GeneralBreadCrumbs data={[{ label: "Meu histórico de Cotações", value: "/cotacoes"}]}/>
                </header>
                <main className='budget-common-panel'>
                    <CompanyHeaderView company_name={user.company.nomeFantasia} user_name={user.nome}></CompanyHeaderView>
                    <CompaniesBudgets company_id={user.company_id} ></CompaniesBudgets>
                </main> 
            </div>
        </div>
    )
}

export default MinhasCotacoes



/* const handleFiltersWithQueries = ({company_id}: any) =>{
    const history = useHistory()
    const { search } = useLocation();
    const query = React.useMemo(() => new URLSearchParams(search), [search]);
    var today = new Date()
    today.setDate(today.getDate() + 1);
    const values = React.useMemo( () => ({
        initial_date: query.get("initial_date") ?? new Date("2022-01-01").toISOString().split('T')[0],
        end_date: query.get("end_date") ?? today.toISOString().split('T')[0],
        p: query.get("p") ?? 1,
        v: query.get("v") ?? "",
        company_id
    }), [query])

    const setValue = (payload: any) =>{
        console.log('aqui payload', payload )
        history.replace({ search: qs.stringify({...values,  ...payload})})
    }
  
    return { values, setValue }
}
 */