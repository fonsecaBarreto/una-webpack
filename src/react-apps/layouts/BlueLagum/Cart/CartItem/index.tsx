import React, { useState } from 'react'
import './style.css'
import CounterControl from '@/react-apps/components/una/inputs-control/CounterControl'
import EmptyImage from "@/public/assets/images/product/empty.svg"

export namespace CartItem {
    export type Params = {
        item: any,
        toAdd: (product: any ) => void,
        toRemove: (product: any) => void,
    }
}
export const CartItem: React.FunctionComponent<CartItem.Params> = ({item, toAdd, toRemove}) =>{

    const [ image, setImage ] = useState(EmptyImage)
    const { product, qtd } = item

    const handleCounterInput = (n:number) =>{
        switch(n){
            case -1 : return toRemove(product)
            case 1 : return toAdd(product)
            default: break;
        }
    }
    
    return (
        <div className='layout-cart-item'>

            <section>
                <img src={image}></img>
            </section>

            <section>
                <span>{ product.specification} </span>
                <span> R$:00,00 </span>
            </section>

            <section>
                <CounterControl value={qtd} onInput={handleCounterInput}></CounterControl>
                <span>R$: 00,00 </span>
            </section>
           
        </div>
    )
}


export default CartItem