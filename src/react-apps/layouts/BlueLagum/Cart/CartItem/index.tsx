import React, { useEffect, useState } from 'react'
import './style.css'

import EmptyImage from "@/public/assets/images/product/empty.svg"
import AddCartButton from '../AsideCartButton'
import { UseCartHandler } from "@/react-apps/store/reducers/cart/handler"

export namespace CartItem {
    export type Params = {
        item: any
    }
}

export const CartItem: React.FunctionComponent<CartItem.Params> = ({item}) =>{

    const cartHandler = UseCartHandler()
    const [ image, setImage ] = useState(EmptyImage)
    const { product, qtd } = item

    const handleChange = (n:number, c: string) =>{
        console.log(n, c)
        switch(c){
            case "PUSH":
                cartHandler.push(n, product);
            break;

            case "OVERWRITE": 
                cartHandler.overwrite(n, product)
            break;
        } 
    }

    return (
        <div className='layout-cart-item'>

            <section>
                <img src={image}></img>
            </section>

            <section>
                <span>{ product.specification} </span>
                <span>{ product.ean }</span>
            </section>

            <section>
                <AddCartButton value={cartHandler.count(product?.ean)} onChange={handleChange}></AddCartButton> 
            </section> 
           
        </div>
    )
}


export default CartItem