import React from 'react';
import UnaLisingContent from "@/react-apps/layouts/components/UnaListingContent"
import { Budget } from '@/domain/views/Budget';
import "./styles.css"
import {Link} from 'react-router-dom'

const STATUS = {
    "NEW": "Aguardando aprovação",
    "IN_PROGRESS": "Em progresso" ,
    "CANCELED": "Cancelado" ,
    "SUCCEEDED": "Compra concluida" ,
    "CLOSED": "Fechado" ,
}

export interface budgetView extends Budget {}

export interface BudgetItemProps extends UnaLisingContent.ItemProps<budgetView> {}

export const BudgetItem: React.FunctionComponent<BudgetItemProps> = (props) =>{
    const { onChange, icon, data } = props;
    const { amount, company_id, created_at, id, status, updated_at, user_id } = data;
    return (
        <div className={`budget-view-item`} onClick={()=>onChange && onChange("OPEN", id )}>
            <header>
                <section>

                    <span> Pedido Nº: {id} </span>
                    <span> Preço Total: <span className='budget-view-price'>{amount > 0 ? `R$:  ${amount}` : "Aguardando definições de orçamento"} </span> </span>
                </section>
                <section>

                    <span> Realizado em: {created_at} </span>
                    <span className='budget-view-price'> {STATUS[status]} </span>
                </section>
            </header>
            <main>
                <Link to={`#`}> Exibir detalhes do pedido </Link>
            </main> 
        </div>
    )
}

export default BudgetItemProps