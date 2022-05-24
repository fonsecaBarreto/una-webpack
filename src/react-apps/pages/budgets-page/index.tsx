import React, { useContext, useEffect, useMemo, useState } from 'react'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import { useDispatch, useSelector } from 'react-redux';
import { budgetServices } from '@/services/api/budget-service'
import FiltersNav from './FiltersNav'
import { GlobalContext } from "@/react-apps/apps/GlobalContext"
import { MakeDialogConfig } from 'fck-react-dialog';
import BudgetView from './modals/BudgetView';
import UnaListingContent from '@/react-apps/layouts/components/UnaListingContent'
import { useLocation, useParams, useRouteMatch } from 'react-router-dom';
import qs from 'query-string';

const mapBudgetsToLavelView = (data: any) =>{
    if(!data) return []
    return data.map((b: any)=>{
       return { 
           value: b.id ,
            label: ` N° ${b.id} - ${ new Date(b.created_at).toISOString().split('T')[0] } - ${b.company.label} - ${b.user.label}`
        }
    })
}

const handleFiltersWithQueries = ({history}: any) =>{
    const { search } = useLocation();
    const query = React.useMemo(() => new URLSearchParams(search), [search]);
    const values = useMemo( () => ({
        initial_date: query.get("initial_date") ?? "2022-01-01",
        end_date: query.get("end_date") ?? new Date().toISOString().split('T')[0],
        p: query.get("p") ?? 1,
        v: query.get("v") ?? "",
        company_id: query.get("company_id") ?? undefined
    }), [query])

    const setValue = (payload: any) =>{
        history.replace({ search: qs.stringify({...values,  ...payload})})
    }
  
    return { values, setValue }
}

const handleRecords = () =>{
    const [ loadTry, setLoadTry ] = useState(0)
    const [ metaData, setMetaData]= useState<UnaListingContent.MetaData | null>(null)
    const [ records, serRecords ] = useState([])
    const setData = (r: any) =>{
        setMetaData(r._metadata)
        serRecords(mapBudgetsToLavelView(r.records))
        setLoadTry(prev=>prev+=1)
    }
    const submit = (filters: any) =>{
        setLoadTry(0)
        budgetServices.list(filters).then(setData)
    }

    return { records, metaData, submit, loadTry}
}

export const ListCotacaoPage = ({ history }: any)=>{

    const context = useContext(GlobalContext)
    const filters: any = handleFiltersWithQueries({history})
    const { records, metaData, submit, loadTry } = handleRecords()
    const [showBudget, setShowBudget ] = useState(null);

    useEffect(()=>{
        if(showBudget) {
          context.dialog.push(MakeDialogConfig(()=> <BudgetView budget_id={showBudget} />,
          ()=>{ 
            setShowBudget(null); 
            return -1;
          }, `Cotação N° ${showBudget}`))
        }
    },[showBudget])

    useEffect(()=>{  submit(filters.values)  },[filters.values])
    const handleActions = (key: any, payload: any) =>{
        switch(key){
            case "PAGE": filters.setValue({"p": payload});break;
            case "OPEN": setShowBudget(payload);break
            case "SUBMIT":{ setShowBudget(payload) };break;
        }
    }
    return (
        <div id="budgets-page">
            <div className='app-container'>
                <ContentGrid loading={false}>
                    <FiltersNav values={filters.values} onChange={(k, p)=>filters.setValue(p)}/>
                    <UnaListingContent searchText={filters.values['v']} metaData={metaData} records={records} freeze={loadTry == 0} onChange={handleActions}>
                    </UnaListingContent>
                </ContentGrid>
            </div> 
        </div>
    )
}

export default ListCotacaoPage
