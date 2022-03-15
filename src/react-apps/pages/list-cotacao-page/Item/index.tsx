import React, { useState } from 'react'
import './style.css'
import { GiNotebook } from 'react-icons/gi'

export type ListMode = "inline" | "block" 

export namespace BudgetListViewItem {
    export type Params = {
        onClick: (key:string, item_data:any) =>void
        item_data: any,
        listMode: ListMode
    }
}

export const BudgetListViewItem: React.FunctionComponent<BudgetListViewItem.Params> = ({ onClick, item_data, listMode }) =>{

    const { id, created_at, company_id } = item_data
    return (
        <div className={`list-view-item ${listMode}`} onClick={()=>onClick("options",id)}>
            <div className="list-view-item-content">
                <section className="list-view-item-icon">
                    <GiNotebook></GiNotebook>
                </section>

                <section>
                    <span className="list-view-item-name"> {id} - { created_at} - {company_id} </span> 
                </section>

                <section>
               
                </section> 
            </div>
        </div>
    )
}

export default BudgetListViewItem