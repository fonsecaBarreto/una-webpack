import React, { useEffect, useState } from 'react'
import './style.css'
import { Forming } from "fck-react-input-controls"
import { budgetServices } from '@/services/api/budget-service'
import { BudgetItem } from '@/domain/views/Budget'
import { LabelView } from '@/domain/views/ListingView'

export namespace BudgetView {

    export type Params = { 
        budget_id: string
    }
    export type View  ={
        id: number;
        amount: number;
        created_at: Date;
        updated_at: Date;
        items: BudgetItem[];
        user: LabelView
        company: LabelView
    }
}

export const BudgetItemComponent: React.FunctionComponent<any> = ({data, index}) =>{
    return (
        <div className='budget-view-budget-item-component'>
            <span>{index}</span>
            <span className='flex-column'>
                <Forming.LabelWrapper label='Produto'>{data.product_id}</Forming.LabelWrapper>
                <Forming.LabelWrapper label='Quantidade'>{data.quantity}</Forming.LabelWrapper>
                <Forming.LabelWrapper label='Preço'>{data.price}</Forming.LabelWrapper>
            </span>
        </div>
    )
}


export const BudgetView: React.FunctionComponent<BudgetView.Params> = ({ budget_id }) =>{
    const [ budget, setBudget] = useState<BudgetView.View | null>(null)
    useEffect(()=>{ budgetServices.find(budget_id).then(setBudget) },[budget_id])
    return (
        <div className='budget-view-modal'>
            { budget === null ? "loading..." : 
            <React.Fragment>
                <section>
                    <div className='flex-column'>
                        <Forming.LabelWrapper label='Numero'>{budget.id}</Forming.LabelWrapper>
                        <Forming.LabelWrapper label='Companhia'>{budget?.company?.label}</Forming.LabelWrapper>
                        <Forming.LabelWrapper label='Usuario'>{budget?.user?.label}</Forming.LabelWrapper>
                        <Forming.LabelWrapper label='Total (R$)'>{budget.amount}</Forming.LabelWrapper>
                        <Forming.LabelWrapper label='Data '>{budget.created_at}</Forming.LabelWrapper>
                    </div> 

                    <div className='budget-view-budget-items'>
                        { budget.items.map((item, i) =>{
                            return ( <BudgetItemComponent key={i} index={i} data={item}></BudgetItemComponent>)
                        }) }
                    </div> 
                </section>
            </React.Fragment>
            }
        </div>
    )
}


export default BudgetView