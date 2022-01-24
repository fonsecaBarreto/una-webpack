import React, { ReactNode, useEffect } from 'react'
import './style.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { ListingView } from '@/domain/views/ListingView'

export namespace ContentPool {
    export type Params = {
        component: React.FunctionComponent<any>,
        list_data: ListingView<any>,
        onAction: (payload?: any)=>void
    }
}

export const ContentPool: React.FunctionComponent<ContentPool.Params> = ({ list_data, component: Component, onAction }) =>{

    const { pageIndex, pages, data } = list_data
    return (
        <div className="bl-common-content-pool">
            <section>
                {
                    data.length > 0 && data.map( (d: any, i: number) =>{
                        return (<Component key={i} item_data={d}></Component> )
                    })
                }
            </section>
            <section>
               { pageIndex < pages && <button className='bl-common-content-plus-btn' onClick={()=>onAction("#+1")}>
                   <AiOutlinePlus></AiOutlinePlus>
                </button>}
            </section>
        </div>
    )
}

export default ContentPool