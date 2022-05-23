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
const mapBudgetsTiLavelView = (data: any) =>{
    if(!data) return []
    return data.map((b: any)=>{
       return { 
           value: b.id ,
            label: ` N° ${b.id} - ${ new Date(b.created_at).toISOString().split('T')[0] } - ${b.company.label} - ${b.user.label}`
        }
    })
}


const handleRecord = () =>{
    const [ loadTry, setLoadTry ] = useState(0)
    const [ metaData, setMetaData]= useState([])
    const [ records, serRecords ] = useState([])
    const setData = (r: any) =>{
        setMetaData(r._metadata)
        serRecords(mapBudgetsTiLavelView(r.records))
        setLoadTry(prev=>prev+=1)
    }
    return { records, setData, loadTry}
}


const handleFiltersWithQueries = ({history}: any) =>{
    const { search } = useLocation();
    const query = React.useMemo(() => new URLSearchParams(search), [search]);
    const values = useMemo( () => ({
        initial_date: query.get("initial_date") ?? "2022-01-01",
        end_date: query.get("end_date") ?? new Date().toISOString().split('T')[0]
    }), [query])

    const setValue = (key: string, value: string) =>{
        history.replace({ search: qs.stringify({...values, [key]:value})})
    }
  
    return { values, setValue }
}

export const ListCotacaoPage = ({ history }: any)=>{

    const { records, setData, loadTry } = handleRecord()
    const context = useContext(GlobalContext)
    const dispatch = useDispatch();
    const filters: any = handleFiltersWithQueries({history})

    useEffect(()=>{  submit()  },[filters.values])

    const submit = () =>{
        budgetServices.list(filters.values).then(setData)
    }
  
    const handleActions = (key: any, payload: any) =>{
        if(key === "options"){
            return history.push({ search: `?id=${payload}`  });
        }
    }

    return (
        <div id="budgets-page">
            <div className='app-container'>
                <ContentGrid loading={false}>
                    <FiltersNav values={filters.values} onChange={filters.setValue}/>
                    <UnaListingContent records={records} freeze={loadTry == 0} onChange={handleActions}>
                    </UnaListingContent>
                </ContentGrid>
            </div> 
        </div>
    )
}

export default ListCotacaoPage


    /* useEffect(()=>{
        if(!location.search) return
        const parsed = queryString.parse(location.search);

        if(parsed?.id) {
          context.dialog.push(MakeDialogConfig(()=> <BudgetView budget_id={parsed.id+""} />,
          ()=>{ history.push({ search: `` }); return -1;
          }, "Cotação"))
        }
        
      },[location.search]) */