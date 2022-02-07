import React, { useState } from 'react'
import './style.css'
import { AiOutlineShop, AiOutlineBell, AiOutlinePaperClip } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'

export type ListMode = "inline" | "block" 

export namespace ListViewItem {
    export type Params = {
        onClick: (key:string, item_data:any) =>void
        item_data: any,
        listMode: ListMode
    }
}

export const ListViewItem: React.FunctionComponent<ListViewItem.Params> = ({ onClick, item_data, listMode }) =>{

    const { value, label } = item_data
    return (
        <div className={`list-view-item ${listMode}`} onClick={()=>onClick("options",value)}>
            <div className="list-view-item-content">
                <section className="list-view-item-icon">
                    <AiOutlineShop></AiOutlineShop>
                </section>

                <section>
                    <span className="list-view-item-name">{label}</span> 
                </section>

                <section>
                  
                </section> 
            </div>
        </div>
    )
}

export default ListViewItem