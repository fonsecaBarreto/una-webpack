import React, { useContext, useEffect } from 'react'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { useDispatch, useSelector } from 'react-redux';
import { budgetServices } from '@/services/api/budget-service'
import FiltersNav from './FiltersNav'
import Item from './Item'
import { BudgetState, setBudgets } from '@/react-apps/store/reducers/budgets';

export const ListCotacaoPage = ()=>{
    const dispatch = useDispatch();
    const ListData: any = useSelector<BudgetState>((state: any)=>state.budgets)
    useEffect(()=>{ if(ListData.sync == 0 ){ listBudgets() } },[])

    const listBudgets = (filters?: any) =>{
        console.log("Loading budgets here with filters: ", filters)
        budgetServices.list(filters).then(resp => dispatch(setBudgets(resp, false)))
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
                        onAction={(v)=>{console.log(v)}}>
                    </ContentPool>  
                </ContentGrid>
            </div> 
        </div>
    )
}

export default ListCotacaoPage