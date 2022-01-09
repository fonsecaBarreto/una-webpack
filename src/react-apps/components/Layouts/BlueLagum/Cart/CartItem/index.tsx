import React from 'react'
import './style.css'
import CounterControl from '@/react-apps/components/una/CounterControl'


export namespace CartItem {
    export type Params = {
        item: any,
        toAdd: (product: any ) => void,
        toRemove: (product: any) => void,
    }
}
export const CartItem: React.FunctionComponent<CartItem.Params> = ({item, toAdd, toRemove}) =>{

    const { produto, qtd } = item

    const handleCounterInput = (n:number) =>{
        switch(n){
            case -1 : return toRemove(produto)
            case 1 : return toAdd(produto)
            default: break;
        }
    }
    
    return (
        <div className='layout-cart-item'>

            <section>
                <img></img>
            </section>

            <section>
                <span> </span>
                <span> R$:00,00 </span>
            </section>

            <section>
                <CounterControl value={qtd} onInput={handleCounterInput}></CounterControl>
                <span> dubtotal </span>
            </section>
           
        </div>
    )
}


export default CartItem