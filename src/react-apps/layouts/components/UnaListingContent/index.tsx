import React, { useEffect, useState } from 'react'
import "./style.css"
import SimpleItem from './standard-items/SimpleItem'
import LoadingComponent from './standard-items/LoadingComponents' 
import IconePadrao from "./dashed-circle.svg"
import { MetadataStorage } from 'class-validator'
export * from "./ListingHandlers"
export namespace UnaLisingContent {

    export type Params<Data> = {
        onChange: any,
        records: any[],
        itemComponent?: ItemProps<Data> | any
        metaData?: any,
        freeze?: boolean,
    }
    export interface ItemProps<Data> {
        data: Data,
        icon?: any,
        onChange?: (k:string, p:any) =>void
    }
}
 
export const UnaLisingContent: React.FunctionComponent<UnaLisingContent.Params<any>>= (props) =>{

    const {  onChange, records=[], metaData, freeze=false, itemComponent: Item } = props;

    return (
        <div className='una-listing-content'>
            <header>
                <span> Total cotações realizadas: {metaData.records_count}</span>
            </header>
            <main>
                <nav className={`listmode`}>
                   { !freeze ? <React.Fragment>
                        {  records?.length > 0 && records.map( (b: any,i: number)=> ( 
                            <React.Fragment key={i}> 
                                { 
                                Item ? <Item onChange={onChange} data={b} /> 
                                : <SimpleItem icon={IconePadrao} onChange={onChange} data={b}/>
                                }
                            </React.Fragment>
                            )) 
                        }  
                    </React.Fragment>
                    : <React.Fragment>
                        {   [...Array(6)].map((v, i)=> <LoadingComponent key={i} />) }
                    </React.Fragment>}
                </nav>
            </main>
            <footer> {/* <PageNavigator freeze={freeze} metaData={metaData} onChange={onChange}></PageNavigator>  */}</footer>
        </div>
    )
}

/* export const PageNavigator = ({ metaData, onChange, freeze }: { freeze: boolean, onChange: any, metaData?: UnaLisingContent.MetaData | null}) =>{
    if(!metaData || freeze) return <span> ... </span>
    const { page, per_page, page_count, records_count } = metaData
    return (
        <div className='una-listing-content-navigator'>
            <nav>
                <div>
                    <button disabled={page == 1} className='ulcn-btn' onClick={()=>onChange("PAGE",page-1)}> &laquo; </button>
                    { [ ...Array(page_count)].map((p, i)=>{
                        return ( <button onClick={()=>onChange("PAGE",i+1)} key={i}
                        className={`ulcn-btn ${ (page == i+1) ? "selected": ""}`}>{i + 1}</button>)
                    })}
                    <button disabled={page == page_count } className='ulcn-btn' onClick={()=>onChange("PAGE",page+1) } > &raquo; </button>
                </div>
            </nav>
            <span className='ulcn-metadata'>
                <span> Encontrado {records_count} resultados ; Pagina: {page} de {page_count} </span>
            </span>
        </div>
    )
} */

export default UnaLisingContent