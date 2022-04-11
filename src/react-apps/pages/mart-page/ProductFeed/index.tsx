import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { useSelector, useDispatch} from 'react-redux'
import { pushToCart, removeFromCart, setCart } from "@/react-apps/store/reducers/cart"
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { ProductItem } from './item'
import SearchHeader, { LabelRow } from '../SearchHeader'
import { BsFillFilterSquareFill } from 'react-icons/bs'
import { MdAdminPanelSettings } from 'react-icons/md'
import GlobalContext from '@/react-apps/apps/main/global-components-context'
import { AiOutlinePlusSquare } from 'react-icons/ai'

export namespace ProductFeed {
    export type onChange = any
}

export const ProductFeed: React.FunctionComponent<any> = ({ onChange }) =>{

    const dispatch = useDispatch();
    const context = useContext(GlobalContext)
    const { cart } = useSelector((state: any)=>state.carrinho)
    const { user, god_mode } = useSelector((state: any)=>state.main)
    const { products } = useSelector( (state: any)=>state.mart);

    const handleItemChange = (a: string, p: any) =>{
        switch(a){
            case "ADD":  dispatch(pushToCart(p)); break;
            case "REMOVE":  dispatch(removeFromCart(p)); break;
        }
    }
    
    const countProductQtd = (ean:string) => {
        const item_index = cart.map((c:any)=> c.product.ean ).indexOf(ean);
        const item = cart[item_index];
        return item?.qtd ?? 0;
    }

    return (
        <div className="una-product-feed">
            
            <ContentPool 
                header={ (queries: any)=>(<SearchHeader  queries={queries}/>) }
                auxHeader={(queries: any)=>(
                    <React.Fragment>
                        { 
                            (user && user.roles.includes("ADMIN")) &&
                            <React.Fragment> 
                                { 
                                 god_mode ? 
                                 <button className='admin-mode-button.add' onClick={ () => onChange("ADMIN", "new")}> 
                                    <AiOutlinePlusSquare/>
                                 </button>
                                 : 
                                 <button className='admin-mode-button' onClick={ () => onChange("GOD_MODE")}> <MdAdminPanelSettings/> </button>
                                }
                            </React.Fragment>
                        } 

                        <button className='mobile-only' onClick={ () => onChange("SHOW_FILTERS")}> <BsFillFilterSquareFill/> </button>
                    </React.Fragment>
                )}
                itemComponent={ ({item_data, listMode })=>(
                <ProductItem 
                    onAction={onChange}
                    showOptions={god_mode}
                    listMode={listMode}
                    count={countProductQtd(item_data.ean)} 
                    produto={item_data}
                    onChange={handleItemChange}
                    ></ProductItem>)} 
                list_data={products} 
                dataAlias={"products"}
                onAction={onChange}>
            </ContentPool>
        </div>
    )
}

export default ProductFeed


