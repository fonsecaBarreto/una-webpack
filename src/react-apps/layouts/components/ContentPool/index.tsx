import React, { ReactNode, useEffect } from 'react'
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
        onAction: (payload?: any)=>void
    }
}

export const ContentPool: React.FunctionComponent<ContentPool.Params> = ({ list_data, itemComponent: ItemComponent, onAction }) =>{

    const { pageIndex, pages, data } = list_data
    return (
        <div className="bl-common-content-pool">

            <header>
                <section>  <label> Total: <span></span> </label> </section>
                <section>
                    <nav>
                        <button> <RiLayoutGridFill/></button>
                        <button> <VscThreeBars/></button>
                        <button> <BsLayoutThreeColumns/></button>
                    </nav>
                </section>
            </header>
            <section>   
                {
                    data.length > 0 && data.map( (d: any, i: number) =>{
                        return (<ItemComponent key={i} item_data={d} onClick={onAction}></ItemComponent> )
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