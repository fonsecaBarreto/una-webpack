import React, { useState } from 'react'
import './style.css'
import { AiOutlineShop, AiOutlineBell, AiOutlinePaperClip } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'

export type ListMode = "inline" | "block" 

export namespace ListViewItem {
    export type Params = {
        onClick: (item_data:any) =>void
        item_data: any,
        listMode: ListMode
    }
}


export const ListViewItem: React.FunctionComponent<ListViewItem.Params> = ({ onClick, item_data, listMode }) =>{

    const { razaoSocial, telefoneComercial } = item_data
    return (
        <div className={`list-view-item ${listMode}`} onClick={()=>onClick(item_data)}>
            <div className="list-view-item-content">
                <section className="list-view-item-icon">
                    <AiOutlineShop></AiOutlineShop>
                </section>

                <section>
                    <span className="list-view-item-name">{razaoSocial}</span> -
                    <span className="list-view-item-name">{telefoneComercial}</span>
                </section>

                <section>
                  
                </section> 
            </div>
        </div>
    )
}

export default ListViewItem