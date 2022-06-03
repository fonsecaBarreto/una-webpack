import UnaLisingContent from '@/react-apps/layouts/components/UnaListingContent'
import React, { useState } from 'react'
import './style.css'
import CancelIcon from "@assets/icons/cancel.svg"
import ClosedIcon from "@assets/icons/closed.png"
import ProgressIcon from "@assets/icons/inprogress.png"
import SuccessIcon from "@assets/icons/success.svg"
import NewIcon from "@assets/icons/new.png"

const STATUS_IMAGE: any = {
    "NEW": NewIcon,
    "IN_PROGRESS": ProgressIcon,
    "CANCELED": CancelIcon,
    "SUCCEEDED": SuccessIcon,
    "CLOSED": ClosedIcon,
}

export type ListMode = "inline" | "block" 

export namespace BudgetListViewItem {
    export interface Params extends UnaLisingContent.ItemProps<any> {}
}

export const BudgetListViewItem: React.FunctionComponent<BudgetListViewItem.Params> = ({ onChange, data, listMode }) =>{
    if(!data) return <span> ... </span>
    const { id, created_at, company, user, status } = data
    return (
        <div className={`admin-budgetp-item ${listMode}`} onClick={()=>onChange && onChange("OPEN",id)}>
            <div className="admin-budgetp-item-content">
                <section className="admin-budgetp-item-icon"> 
                    <img alt="ilustação status do pedido" src={ (STATUS_IMAGE[status]) ?? "" }/>
                </section>
                <section>
                    <span className="admin-budgetp-item-label"> N°{id} - { new Date(created_at).toISOString().split('T')[0] } - {company.label} - {user.label}</span> 
                </section>
            </div> 
        </div>
    )
}

export default BudgetListViewItem