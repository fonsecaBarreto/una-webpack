import React, { ReactNode, useEffect, useRef, useState } from 'react'
import './style.css'
import { ListingView } from '@/domain/views/ListingView'

export namespace ContentPool {
    export type Params = {
        itemComponent: React.FunctionComponent<any>,
        list_data: ListingView<any, any>,
        onAction: (key:string, payload?: any)=>void,
        initial_mode?: ListMode
        dataAlias?:string,
        header?: (queries: any) => React.ReactNode
        auxHeader?: (queries: any) => React.ReactNode
    }
}

export type ListMode = "inline" | "block" 
 
export const PageNavigator = ({ pages=1, index, onClick}: {onClick:any, pages: number, index: number}) =>{
    return (
        <div className='page-navigator-section'>
            <button disabled={index == 1} className='page-navigator-btn' onClick={()=>onClick(index-1)}> &laquo; </button>
            { [ ...Array(pages)].map((p, i)=>{
                return ( <button onClick={()=>onClick(i+1)} key={i}
                    className={`page-navigator-btn ${ (index == i+1) ? "selected": ""}`}>{i + 1}</button>)
            })}
            <button disabled={index == pages } className='page-navigator-btn' onClick={()=>onClick(index+1) } > &raquo; </button>
        </div>
    )
}

export const ContentPool: React.FunctionComponent<ContentPool.Params> = ({ header, auxHeader, dataAlias, list_data, itemComponent: ItemComponent, onAction, initial_mode="block" }) =>{

    const [ listMode, setListMode ] = useState<ListMode>(initial_mode)
    const { pageIndex, pages, queries, total, length } = list_data
    const [ poolData, setPoolData] = useState<any>([])

    useEffect(()=>{
        var data = dataAlias ? list_data.data[dataAlias] : list_data.data
        setPoolData(data)
    },[list_data])

    return (
        <div className="bl-common-content-pool">

            <header>
                <section>  
                    { header && header(queries)}
                </section>
                <section>
                    <nav>
                        { auxHeader && auxHeader(queries) }
                        <button onClick={()=>setListMode("block")}> &#10066; </button>
                        <button onClick={()=>setListMode("inline")}> 	&equiv; </button>
                    </nav>
                </section>
            </header>

            <main>
                <section className={`bl-common-content-pool-flow ${listMode}`}>   
                    {
                        poolData.length > 0 && poolData.map( (d: any, i: number) =>{
                            return (<ItemComponent listMode={listMode} key={i} item_data={d} onClick={onAction}></ItemComponent> )
                        })
                    }
                </section>
                <section> <PageNavigator pages={pages} index={pageIndex} onClick={(index: number) => {onAction("SET_PAGE", index)}} />  </section> 
            </main>
        </div>
    )
}

export default ContentPool

/* { pageIndex < pages && <button className='bl-common-content-plus-btn' onClick={()=>onAction("+1", Number(pageIndex+1))}>
<AiOutlinePlus></AiOutlinePlus>
</button>} */