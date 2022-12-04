import React, { useEffect, useMemo, useState } from 'react'
import EmptyImage from "@/public/assets/images/product/empty.svg"
import AddCartButton from '../AsideCartButton'
import { UseCartHandler } from "@/react-apps/store/reducers/cart/handler"
import { CartState } from '@/react-apps/store/reducers/cart'
import './style.css'

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

    return (
        <div className='layout-cart-item'>
            <section>
                <img src={product.image ?? EmptyImage}></img>
            </section>
            <section>
                <span>{ product.specification } - {product.presentation}</span>
                <span>{ product.ean }</span>
               { cartItem.getSupply() != null && <></>}
            </section>
            <section>
                <AddCartButton value={qtd} onChange={handleChange}></AddCartButton> 
            </section>  
    
            <section className='item-balance'> 
                <label>
                    Preço:
                    <span> { cartItem.getUnitPrice().toFixed(2) }</span>
                </label> 

                <label>
                    Subtotal:
                    <span> { cartItem.getTotalPrice().toFixed(2) }</span>
                </label> 
            </section>
        </div>
    )
}


export default CartItem



/*     const suppliesList = useMemo(()=>{
        if(product.supplies.length == 0 ) return [];
        return product.supplies.map((sup: any)=>{
            return ({ 
                label: `R$: ${sup.price.toFixed(2)} -  ${sup.company_name}`,
                value: sup.company_id+"_"+sup.index,
                payload: { supplier_id: sup.company_id, index: sup.index }
            
            })
        })
    },[ product ]) */


/*     const handleSupplySelect= (e: any) =>{
        console.log(e.target.value)
        const supply = suppliesList.find(p=>p.value == e.target.value);
        cartHandler.overwrite(qtd, product, supply?.payload)
    } */