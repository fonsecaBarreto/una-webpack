import React, { ReactNode, useEffect, useRef, useState } from 'react'
import './style.css'
import { AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
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
        auxHeader?: (queries: any) => React.ReactNode
    }
}

export type ListMode = "inline" | "block" 
 

export const PageNavigator = ({ pages=1, index, onClick}: {onClick:any, pages: number, index: number}) =>{
    return (
        <div className='page-navigator-section'>
            <button disabled={index == 1} className='page-navigator-btn' onClick={()=>onClick(index-1)}> <AiOutlineArrowLeft/> </button>
            { [ ...Array(pages)].map((p, i)=>{
                return ( <button onClick={()=>onClick(i+1)} key={i}
                    className={`page-navigator-btn ${ (index == i+1) ? "selected": ""}`}>{i + 1}</button>)
            })}
            <button disabled={index == pages } className='page-navigator-btn' onClick={()=>onClick(index+1) } > <AiOutlineArrowRight/> </button>
        </div>
    )
}
export const ContentPool: React.FunctionComponent<ContentPool.Params> = ({ header, auxHeader, dataAlias, list_data, itemComponent: ItemComponent, onAction, initial_mode="block" }) =>{

    const [ listMode, setListMode ] = useState<ListMode>(initial_mode)
    const { pageIndex, pages, queries, total, length } = list_data
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
                    <nav>
                        { auxHeader && auxHeader(queries) }
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

                    <section> <PageNavigator pages={pages} index={pageIndex} onClick={(index: number) => {onAction("SET_PAGE", index)}} />  </section> 

                </React.Fragment>}
            </main>
        </div>
    )
}

export default ContentPool

/* { pageIndex < pages && <button className='bl-common-content-plus-btn' onClick={()=>onAction("+1", Number(pageIndex+1))}>
<AiOutlinePlus></AiOutlinePlus>
</button>} */