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
    const { _id, product, qtd, supply } = item

    const cartHandler = UseCartHandler()

    const handleChange = (n:number) =>{
        cartHandler.pushProduct(product, qtd + (1 * n), supply); 
    } 

    return (
        <div className='layout-cart-item'>
            <section>
                <img src={product.image ?? EmptyImage}></img>
            </section>
            <section>
                <span>{ product.specification } - {product.presentation}</span>
                <span>{ product.ean }</span>
            </section>
            <section>
                <AddCartButton value={qtd} onChange={handleChange}></AddCartButton> 
            </section>  
            <section> 
                { 
                    product.supplies.length == 0 ?  "Nenhum oferta encontrada" : "conduições de fornecimento aqui"
                }
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