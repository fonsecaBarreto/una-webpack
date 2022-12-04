import React, { useContext, useEffect, useMemo, useState } from 'react'
import CartItem from "../CartItem"
import "./styles.css"
export const CartGroup: React.FunctionComponent<any> = ({ items, label, supplier_id }) =>{
    return (
        <div className="cart-group">
            <h1>{label}</h1>
           {  
                items?.length > 0 && items.map((c: any, i:number)=> {
                    return (<CartItem key={i} item={c}></CartItem>)
                })
            } 
        </div>
    )
}

export default CartGroup