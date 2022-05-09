import React, { useState } from 'react'
import './style.css'

import EmptyImage from "@/public/assets/images/product/empty.svg"
import AddCartButton from '@/react-apps/pages/mart-page/ProductFeed/AddCartButton'
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

    return (
        <div className='layout-cart-item'>

            <section>
                <img src={image}></img>
            </section>

            <section>
                <span>{ product.specification} </span>
                <span>{ product.ean }</span>
            </section>

            {/* <section>
                <AddCartButton fill={true} value={cartHandler.count(product?.ean)} 
                     onChange={(n:number)=>{cartHandler.push(n, product)}}></AddCartButton>
            </section> */}
           
        </div>
    )
}


export default CartItem