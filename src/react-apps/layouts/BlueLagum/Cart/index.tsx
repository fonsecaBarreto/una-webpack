import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import CartItem from './CartItem'
import { useSelector, useDispatch} from 'react-redux'
import { setCart } from "@/react-apps/store/reducers/cart"
import BlueLagumAsideModal from '../AsideModal'
import { budgetServices } from '@/services/api/budget-service'
import { GlobalContext } from "@/react-apps/apps/GlobalContext"
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import { setLoading } from '@/react-apps/store/reducers/main/actions'
import { Link } from 'react-router-dom'
import { UseCartHandler } from '@/react-apps/store/reducers/cart/handler'
import CartGroup from './CartGroup'

export namespace LayoutCart {
    export type Params = {
        show: boolean,
        onClose: () => void
    }
}

/* Conteudo */
const CartContent = () =>{

    const cartHandler = UseCartHandler()
    return (
        <>
            {  
                cartHandler.getCartBySupplier().map((c: any, i:number)=> {
                    return (
                    <CartGroup items={c.items} label={c.label} value={c.supplier_id} />
                    )
                })
            }
        </>
    )
}

/* Carrinho*/
export const LayoutCart: React.FunctionComponent<LayoutCart.Params> = ({ show, onClose }) =>{
    return (
        <BlueLagumAsideModal loading={false} show={show} title="Carrinho" onClose={onClose} dir="right"
            content={<CartContent/>}
            footer={<div className='bl-cart-footer'> </div>}>
        </BlueLagumAsideModal>
    )
}


export default LayoutCart