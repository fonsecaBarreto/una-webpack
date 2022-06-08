import React from 'react'
import './style.css'
export type ListMode = "inline" | "block" 

export namespace ListViewItem {
    export type Params = {
        onClick: (key:string, item_data:any) =>void
        item_data: any,
        listMode: ListMode
    }
}

export const ListViewItem: React.FunctionComponent<ListViewItem.Params> = ({ onClick, item_data, listMode }) =>{

    const { id, nomeFantasia, telefoneComercial, ativo } = item_data
    return (
        <div className={`list-view-item ${listMode}`} onClick={()=>onClick("OPTIONS",id)}>
            <div className="list-view-item-content">
                <section className="list-view-item-icon">
                    <span></span>
                </section>

                <section>
                    <span className="list-view-item-name">{nomeFantasia} - {telefoneComercial} </span> 
                </section>

                <section>
                    <div className={`list-view-item-name-status-badge ${ativo ?"ativo": "inativo"}`}>
                        {ativo == true ?  <span> &#10003; </span>  :  <span>  &#10007; </span>  }
                    </div>
                </section> 
            </div>
        </div>
    )
}

export default ListViewItem