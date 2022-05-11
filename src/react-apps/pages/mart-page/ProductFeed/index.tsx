import React from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { ProductItem } from './item'
import SearchHeader, { LabelRow } from '../SearchHeader'


export const ProductFeed: React.FunctionComponent<any> = ({ manager }) =>{

    const { user, god_mode } = useSelector((state: any)=>state.main)
    const { products } = useSelector( (state: any)=>state.mart);

    const handleChange = (key:string, p?: any) =>{
        switch(key){
            case "SET_PAGE": manager.onChange({p}, false); break;
            case "SHOW_FILTERS": manager.setForceFilters(true); break;
            case "ADMIN": {  alert("Função desabilitada no momento") }; break;
        }
    } 

    return (
        <div className="una-product-feed">
            <ContentPool list_data={products} dataAlias={"products"}
                onAction={handleChange}
                header={ (queries: any)=>(<SearchHeader  queries={queries}/>) }
                auxHeader={(queries: any)=>(
                    <React.Fragment>
                        <button className='mobile-only' 
                            onClick={ () => handleChange("SHOW_FILTERS", {filters:1})}> &#10018;</button>
                    </React.Fragment>
                )}
                itemComponent={ ({item_data, listMode })=> (
                    <ProductItem 
                        showPrices={user}
                        showOptions={god_mode} 
                        listMode={listMode} produto={item_data} 
                        onAction={handleChange}>
                    </ProductItem>
                )}>
            </ContentPool>
        </div>
    )
}

export default ProductFeed


