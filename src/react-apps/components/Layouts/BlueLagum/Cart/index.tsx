import React, { useEffect, useState } from 'react'
import './style.css'
import { RiCloseFill } from "react-icons/ri"
import CartItem from './CartItem'
import { useSelector, useDispatch} from 'react-redux'

import { pushToCart, removeFromCart, setCart } from "@/react-apps/store/reducers/cart/actions"


export namespace LayoutCart {
    export type Params = {
        show: boolean,
        onClose: () => void
    }
}

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

        <React.Fragment>
            
           { show && <div className={`app-cart-overflow`}>
                <div className='app-cart'>

                    <header>
                        <button className='app-cart-close-btn' onClick={onClose}> <RiCloseFill></RiCloseFill>  </button> 
                    </header>

                    <div className="app-cart-body">
                        { cart.length > 0 && cart.map((c: any, i:number)=> (<CartItem key={i} item={c} toAdd={addToCart} toRemove={rmFromCart}></CartItem>))    }
                    </div>

                    <footer>
                        <div className='app-cart-resume'>

                            <span> Total: { totalProducts } </span>

                            <span className='app-cart-resume-value'> R$: 00,00</span>
                        </div>

                        <button> Finalizar </button>
                    </footer>
                </div>
            </div>}
        </React.Fragment>
    )
}


export default LayoutCart