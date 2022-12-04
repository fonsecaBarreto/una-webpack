import { CartState } from '@/react-apps/store/reducers/cart'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import CartItem from "../CartItem"
import "./styles.css"
export const CartGroup: React.FunctionComponent<any> = ({ items, label, supplier_id }) =>{

    const getSomatorio = () =>{
        let sum = 0;
        items?.length > 0 && items.map((item_data: any)=> {
            const item = new CartState.CartItemHandler(item_data)
            sum+=item.getTotalPrice();
        })
        return sum;
    }

    return (
        <div className="cart-group">
            <header>
                <h5>{label}</h5>
            </header>
            <main>

                {  
                    items?.length > 0 && items.map((c: any, i:number)=> {
                        return (<CartItem key={i} item={c}></CartItem>)
                    })
                } 
            </main>
            <footer>
                <label>
                    Preço total: 
                    <span> { getSomatorio().toFixed(2) }</span>
                </label>
                <button> Solicitar orçamento </button>
            </footer>
        </div>
    )
}

export default CartGroup