import { CartState, removeFromCart, setCart } from '@/react-apps/store/reducers/cart'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import CartItem from "../CartItem"
import "./styles.css"

import { useSelector, useDispatch} from 'react-redux'
import { setLoading } from '@/react-apps/store/reducers/main/actions'
import { BudgetServices, budgetServices } from '@/services/api/budget-service'
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import GlobalContext from '@/react-apps/apps/GlobalContext'
import { useHistory } from 'react-router-dom'

export const CartGroup: React.FunctionComponent<any> = ({ items, label, supplier_id, onChange}) =>{

    const context = useContext(GlobalContext)
    const history = useHistory()
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

        const _ids: string[] = [];
        const serialized_cart_items:BudgetServices.Item[] = items.map((item:any)=>{
            const { _id, qtd } = item
            const [ ean, index, supplier_id ] = _id.split("_")
            _ids.push(_id)
            return { 
                ean, quantity: qtd,
                supply: index != "undefined" && supplier_id != "undefined" ? { index, supplier_id } : null
            }
        });

        try{
            dispatch(setLoading(true))
            await budgetServices.save({ items: serialized_cart_items });
            dispatch(removeFromCart(_ids))
            context.dialog.push(MakeNotification(()=>{return -1},["Obrigado.", "Estamos negociando com fornedores para garantir o melhor preço!","aguarde o nosso contato em até 24 horas."], "Sucesso!", NotificationType.SUCCESS))
            
        }catch(err: any){
            context.dialog.push(MakeNotification(()=>{return -1},[err.mesage ?? "Não foi possível concluir essa cotação! Por favor, entre em contato com o suporte."], "Desculpe!", NotificationType.SUCCESS))
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