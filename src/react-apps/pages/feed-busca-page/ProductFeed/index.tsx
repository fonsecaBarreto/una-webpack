import React, { useEffect } from 'react'
import './style.css'
import Item from './item'
import { useSelector, useDispatch} from 'react-redux'
import { pushToCart, removeFromCart, setCart } from "@/react-apps/store/reducers/cart/actions"
import { AiOutlinePlus } from 'react-icons/ai'

export const ProductFeed: React.FunctionComponent<any> = ({ more, produtos }) =>{

    const dispatch = useDispatch()
    const { cart } = useSelector((state: any)=>state.carrinho)
    const addToCart =(novo_produto: any) =>  dispatch(pushToCart(novo_produto))
    const rmFromCart =(produto: any) => dispatch(removeFromCart(produto))
    
    const countProductQtd = (product_id:string) => {
        const item_index = cart.map((c:any)=> c.product.id ).indexOf(product_id);
        const item = cart[item_index];
        return item?.qtd ?? 0;
    }

    const handleGetProdutos = () => { more() }

    return (
        <div className="una-product-feed">
            <section>
                {
                    produtos?.data.length > 0 && produtos.data.map((p: any, i: string)=>{
                        return (
                            <React.Fragment key={i}>
                                <Item key={i} produto={p} toAdd={addToCart} toRemove={rmFromCart} count={countProductQtd(p.id)} ></Item>
                            </React.Fragment>
                        )
                    })
                }
            </section>
            <section>
                <span> ... </span> 
               { produtos.pageIndex < produtos.pages && <button className='una-product-feed-plus-btn' onClick={handleGetProdutos}><AiOutlinePlus></AiOutlinePlus> </button>}
            </section>
        </div>
    )
}

export default ProductFeed