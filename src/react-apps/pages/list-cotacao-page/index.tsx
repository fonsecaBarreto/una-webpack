import React, { useContext, useEffect } from 'react'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { useDispatch, useSelector } from 'react-redux';
import { budgetServices } from '@/services/api/budget-service'
import FiltersNav from './FiltersNav'
import Item from './Item'
import { BudgetState, setBudgets } from '@/react-apps/store/reducers/budgets';
import GlobalContext from '@/react-apps/apps/main/global-components-context'
import queryString from 'query-string'
import { MakeDialogConfig } from 'fck-react-dialog';
import BudgetView from './modals/BudgetView';

export const ListCotacaoPage = ({ history }: any)=>{

    const context = useContext(GlobalContext)
    const dispatch = useDispatch();
    const ListData: any = useSelector<BudgetState>((state: any)=>state.budgets)
    useEffect(()=>{ if(ListData.sync == 0 ){ listBudgets() } },[])

    useEffect(()=>{
        if(!location.search) return
        const parsed = queryString.parse(location.search);

        if(parsed?.id) {
          context.dialog.push(MakeDialogConfig(()=> <BudgetView budget_id={parsed.id+""} />,
          ()=>{ history.push({ search: `` }); return -1;
          }, "Cotação"))
        }
        
      },[location.search])


    const listBudgets = (filters?: any) =>{
        budgetServices.list(filters).then(resp => dispatch(setBudgets(resp, false)))
    }

    const handleActions = (key: any, payload: any) =>{
        if(key === "options"){
            return history.push({ search: `?id=${payload}`  });
        }
    }
  
    return (
        <div id="budgets-page">
            <div className='app-container'>
                <ContentGrid>
                    <FiltersNav onChange={listBudgets}/>
                    <ContentPool 
                        initial_mode="inline"
                        itemComponent={Item} 
                        list_data={ListData} 
                        dataAlias={"budgets"}
                        onAction={handleActions}>
                    </ContentPool>  
                </ContentGrid>
            </div> 
        </div>
    )
}

export default ListCotacaoPage