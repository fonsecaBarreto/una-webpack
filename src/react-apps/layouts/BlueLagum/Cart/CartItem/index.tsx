import React, { useEffect, useMemo, useState } from 'react'
import EmptyImage from "@/public/assets/images/product/empty.svg"
import AddCartButton from '../AsideCartButton'
import { UseCartHandler } from "@/react-apps/store/reducers/cart/handler"
import { CartState } from '@/react-apps/store/reducers/cart'
import './style.css'

import ProgressBar from "@ramonak/react-progress-bar";
export namespace CartItem {
    export type Params = {
        item: CartState.CartItem
    }
}

export const CartItem: React.FunctionComponent<CartItem.Params> = ({item}) =>{

    const cartItem: CartState.CartItemHandler = useMemo(()=>new CartState.CartItemHandler(item),[item])
    const cartHandler = UseCartHandler()

    const { _id, product, qtd } = item

    const handleChange = (n:number) =>{
        cartHandler.pushProduct(_id, product, qtd + (1 * n)); 
    } 

    const minimum_order = cartItem.getSupply()?.minimum_order ?? 1;
    const isMinimum = cartItem.qtd >= minimum_order;
    const minimum_order_perc = qtd * 100 / minimum_order 

    return (
        <div className='layout-cart-item'>
            <section>
                <img src={product.image ?? EmptyImage}></img>
                <label className='hls'>
                    <span> { product.specification } 
                    </span>
                </label> 
                <label>
                    Marca:
                    <span> { product.brand.label }</span>
                </label> 
                <label>
                    Caixa:
                    <span> { product.quantity_per_unity } {"unidade(s)"}</span>
                </label> 
                <label>
                    Compra minima:
                    <span> { cartItem.getSupply()?.minimum_order ?? 1 } {"caixa(s)"}</span>
                </label> 
            </section>
            <section>
                <AddCartButton value={qtd} onChange={handleChange} warning={!isMinimum}  />
            </section>
    
            <section className='item-processbar-container'>
                <ProgressBar 
                    labelAlignment="center" 
                    height={"6px"} 
                    transitionDuration={".2s"}
                    width="100%" 
                    isLabelVisible={false}
                    bgColor={minimum_order_perc >= 100 ?  "#0766BEaa" : "#55667777"} 
                    completed={minimum_order_perc >= 100 ? 100 : minimum_order_perc } />
            </section>

            <section className='item-balance'> 
                <label>
                    Preço:
                    <span> R$:{ cartItem.getUnitPrice().toFixed(2) }</span>
                </label> 

                <label>
                    Subtotal:
                    <span> R$:{ cartItem.getTotalPrice().toFixed(2) }</span>
                </label> 
            </section> 

        
        </div>
    )
}


export default CartItem
