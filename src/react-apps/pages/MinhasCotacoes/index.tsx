import * as React from 'react';
import "./style.css"
import { useSelector } from 'react-redux';
import CompanyHeaderView from './components/CompanyHeaderView';
import UnaListingContent from '@/react-apps/layouts/components/UnaListingContent';
import { budgetServices } from '@/services/api/budget-service';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid';
import FiltersNav from './components/FiltersNav';
import { MakeDialogConfig } from 'fck-react-dialog';
import GlobalContext from '@/react-apps/apps/GlobalContext';
import BudgetView from '../budgets-page/modals/BudgetView';

const mapBudgetsToLavelView = (data: any) =>{
    if(!data) return []
    return data.map((b: any)=>{
       return { 
           value: b.id , label: ` N° ${b.id} - ${ new Date(b.created_at).toISOString().split('T')[0] } - ${b.company.label} - ${b.user.label}`
        }
    })
}

const handleRecords = () =>{
    const [ loadTry, setLoadTry ] = React.useState(0)
    const [ metaData, setMetaData]=  React.useState<UnaListingContent.MetaData | null>(null)
    const [ records, serRecords ] =  React.useState([])
    const setData = (r: any) =>{
        setMetaData(r._metadata)
        serRecords(mapBudgetsToLavelView(r.records))
        setLoadTry(prev=>prev+=1)
    }
    const submit = (filters: any) =>{
        setLoadTry(0)
        budgetServices.listCompanyBudgets(filters).then(setData)
    }

    return { records, metaData, submit, loadTry}
}

const handleFiltersWithQueries = ({company_id}: any) =>{
    const history = useHistory()
    const { search } = useLocation();
    const query = React.useMemo(() => new URLSearchParams(search), [search]);

    const values = React.useMemo( () => ({
        initial_date: query.get("initial_date") ?? "2022-01-01",
        end_date: query.get("end_date") ?? new Date().toISOString().split('T')[0],
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

const CompaniesBudgets:React.FunctionComponent<{company_id:string}> = ({company_id}) =>{
    const context = React.useContext(GlobalContext)
    const filters: any = handleFiltersWithQueries({ company_id}) 
    const { records, metaData, submit, loadTry } = handleRecords()
    const [showBudget, setShowBudget ] = React.useState(null);
    React.useEffect(()=>{  submit(filters.values)  },[filters.values])

    React.useEffect(()=>{
        if(showBudget) {
          context.dialog.push(MakeDialogConfig(()=> <BudgetView budget_id={showBudget} company_id={company_id} />,
          ()=>{ 
            setShowBudget(null); 
            return -1;
          }, `Cotação N° ${showBudget}`))
        }
    },[showBudget])

    const handleActions = (key: any, payload: any) =>{
        switch(key){
            case "PAGE": filters.setValue({"p": payload});break;
            case "OPEN": setShowBudget(payload);break
            case "SUBMIT":{ setShowBudget(payload) };break;
        }
    }
    return (
        <ContentGrid loading={false}>
            <FiltersNav values={filters.values} onChange={(k, p)=>filters.setValue(p)}/> 
            <UnaListingContent searchText={filters.values['v']} metaData={metaData} records={records} freeze={loadTry == 0} onChange={handleActions}>
            </UnaListingContent> 
        </ContentGrid>
    )
}


export const MinhasCotacoes: React.FunctionComponent<any> = ({history}) =>{
    const { user }:any = useSelector<any>(state=> state.main)
    if(!user) return < span> Carregando... </span>
    return (
        <div id="minhas-cotacoes-page">
            <div className='app-container'>
                <CompanyHeaderView company={user.company}></CompanyHeaderView>
                <CompaniesBudgets company_id={user.company_id}></CompaniesBudgets>
            </div> 
        </div>
    )
}

export default MinhasCotacoes