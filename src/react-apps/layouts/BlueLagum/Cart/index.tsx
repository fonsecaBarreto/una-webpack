import React, { useEffect, useState } from 'react'
import './style.css'
import { RiCloseFill } from "react-icons/ri"
import CartItem from './CartItem'
import { useSelector, useDispatch} from 'react-redux'

import { pushToCart, removeFromCart, setCart } from "@/react-apps/store/reducers/cart/actions"
import BlueLagumAsideModal from '../AsideModal'

export namespace LayoutCart {
    export type Params = {
        show: boolean,
        onClose: () => void
    }
}

/* Footer */
const CartFooter = ({total}: {total: number}) =>{
    return (
    <React.Fragment>
        <div className='bl-cart-footer'>

            <div className='bl-cart-resume'>

                <span> Total: { total } </span>

                <span className='bl-cart-resume-value'> R$: 00,00</span>
            </div>
            <button> Finalizar </button>
        </div>
    </React.Fragment>)
}

/* Conteudo */
const CartContent = ({ cart, add, rm}: {cart:any, add:  (product: any) => void, rm:  (product: any) => void}) =>{

    return (
        <React.Fragment> {  
            cart.length > 0 && cart.map((c: any, i:number)=> {
                return (<CartItem key={i} item={c} toAdd={add} toRemove={rm}></CartItem>)
            })
        } </React.Fragment>
    )
}

/* Carrtinho*/
export const LayoutCart: React.FunctionComponent<LayoutCart.Params> = ({ show, onClose }) =>{

    const { cart } = useSelector((state: any)=>state.carrinho);
    var [ totalProducts, setTotalProducts ]= useState(0);
    const dispatch = useDispatch();

    const addToCart =(novo_produto: any) =>{
       
        dispatch(pushToCart(novo_produto))
    }

    const rmFromCart =(produto: any) =>{
        dispatch(removeFromCart(produto))
    }

    const getTotalItems = () =>{
        var total =0;
        cart.map((c:any)=>{ total+=c.qtd })
        setTotalProducts(total);
    }

    useEffect(()=>{
        getTotalItems()
    },[cart])

    return (
        <BlueLagumAsideModal show={show} title="Carrinho" onClose={onClose} dir="right"
            footer={ <CartFooter total={totalProducts}/> }
            content={<CartContent cart={cart} add={addToCart} rm={rmFromCart}></CartContent> }>
        </BlueLagumAsideModal>
    )
}


export default LayoutCart