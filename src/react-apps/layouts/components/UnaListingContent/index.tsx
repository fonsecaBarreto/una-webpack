import React, { useEffect, useState } from 'react'
import "./style.css"
import SimpleItem from './standard-items/SimpleItem'
import { Button } from 'react-bootstrap';
import SearchInput from "./SearchBar"
import LoadingComponent from './standard-items/LoadingComponents' 
import IconePadrao from "./dashed-circle.svg"
export * from "./ListingHandlers"
export namespace UnaLisingContent {

    export interface MetaData {
        page: number,            // indice da pagina
        per_page: number,        // offset
        page_count: number,      // paginas disponiveis
        records_count: number,   // contagem total da pesquisa
    }

    export type Params = {
        children: any,
        onChange: any,
        records: any[],
        metaData?: MetaData | null,
        freeze?: boolean,
        searchText: string
    }
    export interface ItemProps<Data> {
        onChange?: (k:string, p:any) =>void
        data?: Data,
        icon?: any,
        listMode?: boolean
    }
}
 
export const UnaLisingContent: React.FunctionComponent<UnaLisingContent.Params> = ({ searchText, children, onChange, records=[], metaData,  freeze=false}) =>{
    const [ listMode, setListMode ] = useState(true)
    const [ itemComponent, setItemComponent ] = useState<any>(<SimpleItem icon={IconePadrao}></SimpleItem>)

    useEffect(()=>{
        if(React.Children.count(children) > 0){
            React.Children.map(children, setItemComponent)
        }
    },[children])

    const handleChange = (r:any,k: any) =>{ onChange(r,k)  }

    return (
        <div className='una-listing-content'>
            <header>
                <SearchInput 
                    entry={searchText}
                    onChange={onChange}>
                </SearchInput> 
               <div> 
                    <Button 
                        variant="outline-primary"
                        className="list-mode-btn mobile-only" 
                        onClick={()=>{}}> 
                            <span>&#9886;</span> 
                    </Button>
                    <Button 
                        variant="outline-primary"
                        className="list-mode-btn " 
                        onClick={()=>setListMode((prev:any)=>(!prev))}> {
                            listMode ? <span>&equiv;</span> : <span> &#9871; </span> }
                    </Button>
               </div>
            </header>

            <section className='up-navidator'>
                <PageNavigator freeze={freeze} metaData={metaData} onChange={onChange}></PageNavigator>
            </section>

            <main>
                <nav className={`${listMode ? 'listmode': 'blockmode' }`}>
                   { !freeze ? <React.Fragment>
                        {  records.map( (b: any,i: number)=> ( 
                            <React.Fragment key={i}> {
                                    React.cloneElement(itemComponent, { onChange: handleChange,  data: b, listMode })
                            }</React.Fragment>
                            )) 
                        }  
                    </React.Fragment>
                    : <React.Fragment>
                        {   [...Array(6)].map((v, i)=> <LoadingComponent key={i} />) }
                    </React.Fragment>}
                </nav>
            </main>
            <footer> <PageNavigator freeze={freeze} metaData={metaData} onChange={onChange}></PageNavigator> </footer>
        </div>
    )
}

export const PageNavigator = ({ metaData, onChange, freeze }: { freeze: boolean, onChange: any, metaData?: UnaLisingContent.MetaData | null}) =>{
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
}

export default UnaLisingContent