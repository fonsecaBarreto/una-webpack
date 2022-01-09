import React, { useEffect } from 'react'
import './style.css'
import Item from './item'
import { produtosService } from "@/react-apps/services/produtos-service"

import { useSelector, useDispatch} from 'react-redux'
import { pushToCart, removeFromCart, setCart } from "@/react-apps/store/reducers/cart/actions"

export const ProdutFeed: React.FunctionComponent<any> = () =>{

    const dispatch = useDispatch()
    const { produtos } = useSelector((state: any)=>state.departamentos)
    const { cart } = useSelector((state: any)=>state.carrinho)

    const addToCart =(novo_produto: any) =>{
        dispatch(pushToCart(novo_produto))
    }

    const rmFromCart =(produto: any) =>{
        dispatch(removeFromCart(produto))
    }

    useEffect(()=>{ produtosService.list() },[])
    return (
        <div className="una-product-feed">
            {
                produtos && produtos.data.map((p: any, i: string)=>{
                    return (
                        <Item key={i} produto={p} add={addToCart} remv={rmFromCart}></Item>
                    )
                })
            }
            <span>tatos de Tantos </span> 
            <button> Mostart Mains </button>
        </div>
    )
}

export default ProdutFeed