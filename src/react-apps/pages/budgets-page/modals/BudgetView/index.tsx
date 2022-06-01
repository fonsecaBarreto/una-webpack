import React, { useEffect, useState } from 'react'
import './style.css'
import { Forming } from "fck-react-input-controls"
import { budgetServices } from '@/services/api/budget-service'
import { Budget, BudgetItem } from '@/domain/views/Budget'
import SelectControl from '@/react-apps/components/una/inputs-control/SelectControl'

const STATUS_LIST = [
    { label: "Novo", value: "NEW"},
    { label: "Em Analise", value:"IN_PROGRESS"},
    { label: "Sucedido", value:"SUCCEEDED"},
    { label: "Cancelado", value:"CANCELED" },
    { label: "Fechado", value:"CLOSED"}       
]

export namespace BudgetView {
    export interface BudgetProductItem extends BudgetItem { product: any }
    export type Params = { budget_id: string, company_id?:string, v?: number }
}

export const BudgetItemComponent: React.FunctionComponent<any> = ({data, index}) =>{

    const { quantity, price, product} = data
    return (
        <div className='budget-view-budget-item-component'>
            <span>{index}</span>
            <span className='flex-column'>
                <Forming.LabelWrapper label='Produto'>{product.specification} - [{product.ean}]</Forming.LabelWrapper>
                <Forming.LabelWrapper label='Quantidade'>{quantity}</Forming.LabelWrapper>
                <Forming.LabelWrapper label='Preço'>{price}</Forming.LabelWrapper>
            </span>
        </div>
    )
}


export const BudgetView: React.FunctionComponent<BudgetView.Params> = ({ budget_id, company_id, v=1}) =>{

    const [ budget, setBudget] = useState<any>(null);
    const [ loadTry, setLoadTry ] = useState(0);
    const [ status, setStatus ] = useState(null);

    useEffect(()=>{
        if(!budget) return;
        setStatus(budget.status)
    },[budget])

    useEffect(()=>{ 
        if(!company_id){
            budgetServices.find(budget_id)
            .then(setBudget) 
            .finally(()=>setLoadTry(prev=>prev+=1))
        }else{
            budgetServices.findCompanyBudget(budget_id, company_id)
            .then(setBudget) 
            .finally(()=>setLoadTry(prev=>prev+=1))
        }
    },[budget_id])

    const handleStatusChange = (payload: { value: any, label: string}) =>{
        const { value } = payload;
        setStatus(null);
        budgetServices.updateStatus(budget_id, value)
            .then(()=>setStatus(value)) 
    }
    return (
        <div className='budget-view-modal'>
            { loadTry == 0 ? "Procurando..." : 
                <React.Fragment>
                    { !budget ? "Nada encontrado!" :
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
                                    { budget.items.map((item:any, i:number) =>{
                                        return ( <BudgetItemComponent key={i} index={i+1} data={item}></BudgetItemComponent>)
                                    }) }
                                </div>   

                                <div>
                                    <SelectControl disabled={v==0} className="select-status-control" onChange={handleStatusChange} items={STATUS_LIST} value={status ?? ""}></SelectControl>
                                </div>
                              
                            </section>
                        </React.Fragment>
                    }
                </React.Fragment>
            }
        </div>
    )
}


export default BudgetView