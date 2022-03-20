import React, { ReactNode, useEffect, useState } from 'react'
import './style.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { ListingView } from '@/domain/views/ListingView'
import { RiLayoutGridFill } from 'react-icons/ri'
import { VscThreeBars } from 'react-icons/vsc'
import LoadingComponent from '@/react-apps/components/una/Loading'

export namespace ContentPool {
    export type Params = {
        itemComponent: React.FunctionComponent<any>,
        list_data: ListingView<any, any>,
        onAction: (key?:string, payload?: any)=>void,
        initial_mode?: ListMode
        dataAlias?:string,
        header?: (queries: any) => React.ReactNode
    }
}

export type ListMode = "inline" | "block" 
 
export const ContentPool: React.FunctionComponent<ContentPool.Params> = ({ header, dataAlias, list_data, itemComponent: ItemComponent, onAction, initial_mode="block" }) =>{

    const [ listMode, setListMode ] = useState<ListMode>(initial_mode)
    const { pageIndex, pages, data, queries, total, length } = list_data
    const [ poolData, setPoolData] = useState<any>([])
    const [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        var data = dataAlias ? list_data.data[dataAlias] : list_data.data
        setPoolData(data)
        if(data.length > 0 ) setLoading(false);
    },[list_data])

    return (
        <div className="bl-common-content-pool">

            <header>
                <section>  
                    { header && header(queries)}
                </section>

                <section>
                    <label> Total: <span> {length}/{total}</span> </label>  
                    <nav>
                        <button onClick={()=>setListMode("block")}> <RiLayoutGridFill/></button>
                        <button onClick={()=>setListMode("inline")}> <VscThreeBars/></button>
                    </nav>
                </section>

            </header>

            <main>
                { loading ?  <LoadingComponent></LoadingComponent> :
                <React.Fragment>
                    <section className={`bl-common-content-pool-flow ${listMode}`}>   
                        {
                            poolData.length > 0 && poolData.map( (d: any, i: number) =>{
                                return (<ItemComponent listMode={listMode} key={i} item_data={d} onClick={onAction}></ItemComponent> )
                            })
                        }
                    </section>

                    <section>
                    { pageIndex < pages && <button className='bl-common-content-plus-btn' onClick={()=>onAction("+1")}>
                        <AiOutlinePlus></AiOutlinePlus>
                        </button>}
                    </section>
                </React.Fragment>}
            </main>
        </div>
    )
}

export default ContentPool