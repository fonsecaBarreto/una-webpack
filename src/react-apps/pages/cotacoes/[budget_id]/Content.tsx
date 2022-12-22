import React from 'react';
import UnaLisingContent from "@/react-apps/layouts/components/UnaListingContent"
import { Budget } from '@/domain/views/Budget';
import {Link} from 'react-router-dom'
import UnaListingContent from '@/react-apps/layouts/components/UnaListingContent';
import { LabelView } from '@/domain/views/ListingView';
import BudgetItem from './Item';

const STATUS = {
    "NEW": "Aguardando aprovação",
    "IN_PROGRESS": "Em progresso" ,
    "CANCELED": "Cancelado" ,
    "SUCCEEDED": "Compra concluida" ,
    "CLOSED": "Fechado" ,
}

export interface BudgetFindView extends Budget {
    company: LabelView
    user: LabelView,
    items: {
      ean: string,
      product_specification: string,
      product_image: string,
      quantity: string,
      price: number,
      order: number,
    }[]
}

export interface BudgetContentProps {
    onChange: any,
    data: BudgetFindView
}

export const BudgetContent: React.FunctionComponent<BudgetContentProps> = (props) =>{
    const { onChange, data } = props;
    const { amount, company_id, created_at, id, status, updated_at, user_id, items } = data;


    return (
        <div className="budget-content-item">
            <header>
                <section>
                    <span> Preço Total: <span>{amount > 0 ? `R$:  ${amount}` : "Aguardando definições de orçamento"} </span> </span>
                </section>
                <section>
                    <span> Realizado em: {created_at} </span>
                    <span> {STATUS[status]} </span>
                </section>
            </header>
            <main>
                <UnaListingContent 
                    itemComponent={BudgetItem}
                    metaData={{}} 
                    records={items} 
                    freeze={false} 
                    onChange={onChange} />
            </main>
        </div>
    )
}

export default BudgetContent