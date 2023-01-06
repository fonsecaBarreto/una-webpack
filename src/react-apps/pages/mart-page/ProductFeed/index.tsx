import React, { useContext } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { ProductItem } from './item'
import SearchHeader from '../SearchHeader'
import FilterImage from "@assets/icons/filter-icon.svg"

export const ProductFeed: React.FunctionComponent<any> = ({ manager }) =>{

    const { user, god_mode } = useSelector((state: any)=>state.main)
    const { products } = useSelector( (state: any)=>state.mart);

    const handleChange = (key:string, p?: any) =>{
        switch(key){
            case "SET_PAGE": manager.onChange({p}, false); break;
            case "SHOW_FILTERS": manager.setForceFilters(true); break;
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
                            onClick={ () => handleChange("SHOW_FILTERS", {filters:1})}> 
                            
                            <img src={FilterImage}/>
                
                            </button>
                    </React.Fragment>
                )}
                itemComponent={ ({item_data, listMode })=> (
                    <ProductItem 
                        showPriceFromWeight={
                            (['queijo'].includes(item_data?.subCategory?.value.split("-")[0])) ? true : false
                        }
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


