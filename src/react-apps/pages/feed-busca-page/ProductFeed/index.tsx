import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector, useDispatch} from 'react-redux'
import { pushToCart, removeFromCart, setCart } from "@/react-apps/store/reducers/cart/actions"
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { ProductItem } from './item'

export namespace ProductFeed {
    export type onRequest = any
    export type list_data = any
}

export const ProductFeed: React.FunctionComponent<any> = ({ onRequest, list_data }) =>{

    const dispatch = useDispatch()
    const { cart } = useSelector((state: any)=>state.carrinho)

    const addToCart =(novo_produto: any) =>  dispatch(pushToCart(novo_produto))
    const rmFromCart =(produto: any) => dispatch(removeFromCart(produto))
    
    const countProductQtd = (product_id:string) => {
        const item_index = cart.map((c:any)=> c.product.id ).indexOf(product_id);
        const item = cart[item_index];
        return item?.qtd ?? 0;
    }
    
    return (
        <div className="una-product-feed">
            <ContentPool 
                itemComponent={ ({item_data, listMode })=>(
                <ProductItem 
                    listMode={listMode}
                    count={countProductQtd(item_data.id)} 
                    produto={item_data}
                    toAdd={addToCart}
                    toRemove={rmFromCart} ></ProductItem>)} 
                list_data={list_data} 
                dataAlias={"products"}
                onAction={onRequest}>
            </ContentPool>
        </div>
    )
}

export default ProductFeed


