import React, { ReactNode, useEffect, useState } from 'react'
import './style.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { ListingView } from '@/domain/views/ListingView'
import { RiLayoutGridFill } from 'react-icons/ri'
import { VscThreeBars } from 'react-icons/vsc'
import { BsLayoutThreeColumns } from 'react-icons/bs'

export namespace ContentPool {
    export type Params = {
        itemComponent: React.FunctionComponent<any>,
        list_data: ListingView<any>,
        onAction: (payload?: any)=>void,
        initial_mode?: ListMode
    }
}

export type ListMode = "inline" | "block" 
 
export const ContentPool: React.FunctionComponent<ContentPool.Params> = ({ list_data, itemComponent: ItemComponent, onAction, initial_mode="block" }) =>{
    const [ listMode, setListMode ] = useState<ListMode>(initial_mode)
    const { pageIndex, pages, data } = list_data
    return (
        <div className="bl-common-content-pool">

            <header>
                <section>  <label> Total: <span></span> </label> </section>
                <section>
                    <nav>
                        <button onClick={()=>setListMode("block")}> <RiLayoutGridFill/></button>
                        <button onClick={()=>setListMode("inline")}> <VscThreeBars/></button>
                    </nav>
                </section>
            </header>
            
            <section className={`bl-common-content-pool-flow ${listMode}`}>   
                {
                    data.length > 0 && data.map( (d: any, i: number) =>{
                        return (<ItemComponent listMode={listMode} key={i} item_data={d} onClick={onAction}></ItemComponent> )
                    })
                }
            </section>

            <section>
               { pageIndex < pages && <button className='bl-common-content-plus-btn' onClick={()=>onAction("+1")}>
                   <AiOutlinePlus></AiOutlinePlus>
                </button>}
            </section>
        </div>
    )
}

export default ContentPool