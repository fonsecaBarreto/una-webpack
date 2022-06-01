import React, { useContext } from 'react'
import './style.css'
import { useDispatch, useSelector, useStore } from 'react-redux'
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { ProductItem } from './item'
import SearchHeader, { LabelRow } from '../SearchHeader'
import { setLoading } from '@/react-apps/store/reducers/main/actions'
import { produtosService } from '@/services/api/produtos-service'
import GlobalContext from '@/react-apps/apps/GlobalContext'
import { MakeDialogConfig } from 'fck-react-dialog'
import ProductForm from '@/react-apps/forms/ProductForm'


export const ProductFeed: React.FunctionComponent<any> = ({ manager }) =>{

    const context = useContext(GlobalContext)
    const dispatch = useDispatch()
    const { user, god_mode } = useSelector((state: any)=>state.main)
    const { products } = useSelector( (state: any)=>state.mart);

    const handleChange = (key:string, p?: any) =>{
        switch(key){
            case "SET_PAGE": manager.onChange({p}, false); break;
            case "SHOW_FILTERS": manager.setForceFilters(true); break;
            case "ADMIN": handleProductForm(p); break;
        }
    } 

    const handleProductForm = async (product_ean?: string) =>{
        dispatch(setLoading(true));

        var product:any = null;
        await produtosService.find({ ean: product_ean })
            .then(resp=>product = resp.product)
            .catch(_=>product= null)
            .finally(()=>{ dispatch(setLoading(false)) })

        console.log("encontrei: ",JSON.stringify(product))
        
        context.dialog.push(MakeDialogConfig(
            ({onAction})=>( <ProductForm entry={product} onAction={onAction} onData={()=>{}}/>
            ),()=>-1), "Produto");
      
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


