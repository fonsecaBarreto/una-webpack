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

    useEffect(()=>{ produtosService.list() },[])

    const addToCart =(novo_produto: any) =>{
        dispatch(pushToCart(novo_produto))
    }

    const rmFromCart =(produto: any) =>{
        dispatch(removeFromCart(produto))
    }

    const countProductQtd = (product_id:string) => {
        const item_index = cart.map((c:any)=> c.product.id ).indexOf(product_id);
        const item = cart[item_index];
        return item?.qtd ?? 0;
    }


    return (
        <div className="una-product-feed">
            {
                produtos && produtos.data.map((p: any, i: string)=>{
                    return (
                        <React.Fragment key={i}>
                            <Item key={i} produto={p} toAdd={addToCart} toRemove={rmFromCart} count={countProductQtd(p.id)} ></Item>
                        </React.Fragment>
                    )
                })
            }

            <div>
                <span>tatos de Tantos </span> 
                <button> Mostrar Mais aqui </button>
            </div>
        </div>
    )
}

export default ProdutFeed