import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import CartItem from './CartItem'
import { useSelector, useDispatch} from 'react-redux'
import { pushToCart, removeFromCart, setCart } from "@/react-apps/store/reducers/cart"
import BlueLagumAsideModal from '../AsideModal'
import { budgetServices } from '@/services/api/budget-service'
import GlboalContenxt from "@/react-apps/apps/main/global-components-context"
import { MakeNotification, NotificationType } from 'fck-react-dialog'
export namespace LayoutCart {
    export type Params = {
        show: boolean,
        onClose: () => void
    }
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
/* Footer */
const CartFooter = ({total, onSubmit}: {total: number, onSubmit: any}) =>{
    return (
    <React.Fragment>
        <div className='bl-cart-footer'>
            <div className='bl-cart-resume'>
                <span> Total: { total } </span>
                <span className='bl-cart-resume-value'> R$: 00,00</span>
            </div>
            <button onClick={onSubmit}> Finalizar </button>
        </div>
    </React.Fragment>)
}
/* Carrinho*/
export const LayoutCart: React.FunctionComponent<LayoutCart.Params> = ({ show, onClose }) =>{

    const context = useContext(GlboalContenxt)
    const { user } = useSelector((state: any)=>state.main);
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

    const submit = async () =>{
        try{
            await budgetServices.save({
                products: cart.map((c:any)=>({ ean: c.product.ean, quantity: c.qtd})),
                company_id: user.company_id
            });
            context.dialog.push(MakeNotification(()=>{return -1},["Obrigado.", "Cotação realizada com sucesso!"], "Sucesso!", NotificationType.SUCCESS))
            onClose()
            dispatch(setCart([]))
        }catch(err: any){
            context.dialog.push(MakeNotification(()=>{return -1},[err.mesage ?? "Erro inesperado"], "Erro!", NotificationType.SUCCESS))
        }
    }

    useEffect(()=>{
        getTotalItems()
    },[cart])

    return (
        <BlueLagumAsideModal loading={false} show={show} title="Carrinho" onClose={onClose} dir="right"
            footer={ <CartFooter onSubmit={submit} total={totalProducts}/> }
            content={<CartContent cart={cart} add={addToCart} rm={rmFromCart}></CartContent> }>
        </BlueLagumAsideModal>
    )
}


export default LayoutCart