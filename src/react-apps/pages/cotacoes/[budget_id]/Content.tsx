import React from 'react';
import UnaLisingContent from "@/react-apps/layouts/components/UnaListingContent"
import { Budget } from '@/domain/views/Budget';
import {Link} from 'react-router-dom'
import UnaListingContent from '@/react-apps/layouts/components/UnaListingContent';
import { LabelView } from '@/domain/views/ListingView';
import BudgetItem from './Item';
import StatusProgress from '@/react-apps/components/StatusProgress';
import NewIcon from "@assets/status/waiting-list-icon.svg"
import InProgressIcon from "@assets/status/page-search-result-found-icon.svg"
import ClosedIcon from "@assets/status/tick-symbol-icon.svg"

const STATUS = {
    "NEW": "Aguardando aprovação",
    "IN_PROGRESS": "Em progresso" ,
    "CANCELED": "Cancelado" ,
    "SUCCEEDED": "Compra concluida" ,
    "CLOSED": "Fechado" ,
}

const STATUS_PROGRESS_BAR = [ 
    { label: STATUS["NEW"] , image:NewIcon}, 
    { label: STATUS["IN_PROGRESS"], image:InProgressIcon },
    { label: STATUS["CLOSED"], image:ClosedIcon },
]

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
                    <span> {"Preço Total:  "}
                        <b>
                            {amount > 0 ? `R$:  ${amount.toFixed(2)}` : "Aguardando definições de orçamento"}
                        </b> 
                    </span>
                </section>
            </header>
            <main>
                <StatusProgress index={0} items={STATUS_PROGRESS_BAR} />
                <UnaListingContent 
                    itemComponent={BudgetItem}
                    metaData={{ records_count: items.length }} 
                    records={items} 
                    freeze={false} 
                    onChange={onChange} />
            </main>
        </div>
    )
}

export default BudgetContent