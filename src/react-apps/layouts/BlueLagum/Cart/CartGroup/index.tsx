import { CartState, setCart } from '@/react-apps/store/reducers/cart'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import CartItem from "../CartItem"
import "./styles.css"

import { useSelector, useDispatch} from 'react-redux'
import { setLoading } from '@/react-apps/store/reducers/main/actions'
import { budgetServices } from '@/services/api/budget-service'

export const CartGroup: React.FunctionComponent<any> = ({ items, label, supplier_id }) =>{

    const { user } = useSelector((state: any)=>state.main);

    const dispatch = useDispatch();
    const isReady = useMemo(() =>{
        if(items?.length == 0) return false;
        let isReady = true;
        items.map((item_data: any)=> {
            const item = new CartState.CartItemHandler(item_data)
            if((item.getSupply()?.minimum_order ?? 1) > item.qtd){
                isReady = false;
            }
        })
        return isReady;
    },[items])


    const getSomatorio = () =>{
        let sum = 0;
        items?.length > 0 && items.map((item_data: any)=> {
            const item = new CartState.CartItemHandler(item_data)
            sum+=item.getTotalPrice();
        })
        return sum;
    }


    const submit = async () =>{
        try{
            dispatch(setLoading(true))
            await budgetServices.save({
                products: items.map((c:any)=>({ ean: c.product.ean, quantity: c.qtd})),
                company_id: user.company_id
            });

            alert('Orçamento feito com sucesso!')
            // context.dialog.push(MakeNotification(()=>{return -1},["Obrigado.", "Estamos negociando com fornedores para garantir o melhor preço!","aguarde o nosso contato em até 24 horas."], "Sucesso!", NotificationType.SUCCESS))
            
            dispatch(setCart([]))
        }catch(err: any){
            console.log(err)
            // context.dialog.push(MakeNotification(()=>{return -1},[err.mesage ?? "Erro inesperado"], "Erro!", NotificationType.SUCCESS))
        }
        finally{
            dispatch(setLoading(false))
        }
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
               
                <button className={`${!isReady ? 'not-allowed': ''}`} disabled={!isReady} onClick={submit}> {isReady ? "Solicitar orçamento" : "Mínimo não atingido"} </button>
                <label>
                    Preço total: 
                    <span> { getSomatorio().toFixed(2) }</span>
                </label>
            </footer>
        </div>
    )
}

export default CartGroup