import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import CartItem from './CartItem'
import { useSelector, useDispatch} from 'react-redux'
import { setCart } from "@/react-apps/store/reducers/cart"
import BlueLagumAsideModal from '../AsideModal'
import { budgetServices } from '@/services/api/budget-service'
import { GlobalContext } from "@main/app"
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import { setLoading } from '@/react-apps/store/reducers/main/actions'

export namespace LayoutCart {
    export type Params = {
        show: boolean,
        onClose: () => void
    }
}

/* Conteudo */
const CartContent = ({ cart}: {cart:any}) =>{
    return (
        <React.Fragment> {  
            cart.length > 0 && cart.map((c: any, i:number)=> {
                return (<CartItem key={i} item={c}></CartItem>)
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
                <span className='bl-cart-resume-value'> ... </span>
            </div>
            <button className='cart-budget-button' onClick={onSubmit}> Solicitar orçamento </button>
        </div>
    </React.Fragment>)
}
/* Carrinho*/
export const LayoutCart: React.FunctionComponent<LayoutCart.Params> = ({ show, onClose }) =>{

    const context = useContext(GlobalContext)
    const { user } = useSelector((state: any)=>state.main);
    const { cart } = useSelector((state: any)=>state.carrinho);
    var [ totalProducts, setTotalProducts ]= useState(0);
    const dispatch = useDispatch();

    const getTotalItems = () =>{
        var total =0;
        cart.map((c:any)=>{ total+=c.qtd })
        setTotalProducts(total);
    }

    const submit = async () =>{
        try{
            dispatch(setLoading(true))
            await budgetServices.save({
                products: cart.map((c:any)=>({ ean: c.product.ean, quantity: c.qtd})),
                company_id: user.company_id
            });
            context.dialog.push(MakeNotification(()=>{return -1},["Obrigado.", "Estamos negociando com fornedores para garantir o melhor preço!","aguarde o nosso contato em até 24 horas."], "Sucesso!", NotificationType.SUCCESS))
            onClose()
            dispatch(setCart([]))
        }catch(err: any){
            context.dialog.push(MakeNotification(()=>{return -1},[err.mesage ?? "Erro inesperado"], "Erro!", NotificationType.SUCCESS))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    useEffect(()=>{ getTotalItems() },[cart])

    return (
        <BlueLagumAsideModal loading={false} show={show} title="Carrinho" onClose={onClose} dir="right"
            footer={ <CartFooter onSubmit={submit} total={totalProducts}/> }
            content={<CartContent cart={cart}></CartContent> }>
        </BlueLagumAsideModal>
    )
}


export default LayoutCart