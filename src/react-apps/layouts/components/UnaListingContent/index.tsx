import React, { useEffect, useState } from 'react'
import "./style.css"
import SimpleItem from './standard-items/SimpleItem'
import { Button } from 'react-bootstrap';
import SearchInput from "./SearchBar"
import LoadingComponent from './standard-items/LoadingComponents' 
import IconePadrao from "./dashed-circle.svg"

export namespace UnaLisingContent {
    export type Params = {
        children: any,
        onChange: any,
        records: any[],
        freeze?: boolean
    }
    export interface ItemProps<Data> {
        onChange?: (k:string, p:any) =>void
        data?: Data,
        icon?: any,
        listMode?: boolean
    }
}
 
export const UnaLisingContent: React.FunctionComponent<UnaLisingContent.Params> = ({ children, onChange, records=[], freeze=false}) =>{
    const [ searchValue, setSearchValue ] = useState("")
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
                        value={searchValue}
                        onChange={(v:any, O: any)=>{}}>
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
            <footer> </footer>
        </div>
    )
}

export default UnaLisingContent