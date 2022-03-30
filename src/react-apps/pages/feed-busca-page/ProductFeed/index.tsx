import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import { useSelector, useDispatch} from 'react-redux'
import { pushToCart, removeFromCart, setCart } from "@/react-apps/store/reducers/cart/actions"
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { ProductItem } from './item'
import SearchHeader from '../SearchHeader'
import { BsFillFilterSquareFill } from 'react-icons/bs'
import { MdAdminPanelSettings } from 'react-icons/md'
import GlobalContext from '@/react-apps/apps/main/global-components-context'
import { MakeDialogConfig, MakeOptions } from 'fck-react-dialog'
import ProductForm from '@/react-apps/forms/ProductForm'
export namespace ProductFeed {
    export type onAction = any
    export type list_data = any
}

export const ProductFeed: React.FunctionComponent<any> = ({ onAction, list_data }) =>{

    const dispatch = useDispatch();
    const context = useContext(GlobalContext)
    const { cart } = useSelector((state: any)=>state.carrinho)
    const { user, god_mode } = useSelector((state: any)=>state.main)

    const addToCart =(novo_produto: any) =>  dispatch(pushToCart(novo_produto))
    const rmFromCart =(produto: any) => dispatch(removeFromCart(produto))
    
    const countProductQtd = (product_id:string) => {
        const item_index = cart.map((c:any)=> c.product.id ).indexOf(product_id);
        const item = cart[item_index];
        return item?.qtd ?? 0;
    }
    
    const handleAction = (action:any) =>{
        if(action === "SHOW_OPTIONS"){
            context.dialog.push(MakeDialogConfig(()=>(<ProductForm entry={{}} onAction={()=>{}} onData={()=>{}}/>),()=>{},"Produto"))
            //context.dialog.push(MakeOptions(()=>{`0`},[{ label: "Editar" }],"Opções"))
        }
    }

    
    return (
        <div className="una-product-feed">
            <ContentPool 
                header={ (queries: any)=>(<SearchHeader  queries={queries}/>) }
                auxHeader={(queries: any)=>(
                    <React.Fragment>
                        { 
                            (user && user.roles.includes("ADMIN")) &&
                            <button className='admin-mode-button' onClick={ () => onAction("ADMINS_MODE")}> <MdAdminPanelSettings/> </button>
                        } 

                        <button className='mobile-only' onClick={ () => onAction("SHOW_FILTERS")}> <BsFillFilterSquareFill/> </button>
                    </React.Fragment>
                )}
                itemComponent={ ({item_data, listMode })=>(
                <ProductItem 
                    onAction={handleAction}
                    showOptions={god_mode}
                    listMode={listMode}
                    count={countProductQtd(item_data.id)} 
                    produto={item_data}
                    toAdd={addToCart}
                    toRemove={rmFromCart} ></ProductItem>)} 
                list_data={list_data} 
                dataAlias={"products"}
                onAction={onAction}>
            </ContentPool>
        </div>
    )
}

export default ProductFeed


