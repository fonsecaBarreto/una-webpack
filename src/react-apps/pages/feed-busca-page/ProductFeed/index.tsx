import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector, useDispatch} from 'react-redux'
import { pushToCart, removeFromCart, setCart } from "@/react-apps/store/reducers/cart/actions"

import ContentPool, { ListMode } from '@/react-apps/layouts/components/ContentPool'
import ProductImage from "@/public/assets/images/shopping-bag.jpg"
import CounterControl from '../../../components/una/inputs-control/CounterControl'
import SubmitButton from '../../../components/una/inputs-control/SubmitButton'
import { ListingView } from '@/domain/views/ListingView'
import { Product } from '@/domain/views/Produto'

export namespace ProductItem {
    export type Params = {
        toAdd: () => void
        toRemove: () => void,
        count: number,
        listMode: ListMode
    }
}

export const ProductItem: React.FunctionComponent<any> = ({produto, toAdd, toRemove, count, listMode }) =>{
    const { specification, image, brand } = produto

    const handleCounterInput = (n:number) =>{
        switch(n){
            case -1 : return toRemove(produto)
            case 1 : return toAdd(produto)
            default: break;
        }
    }
    return (
        <div className={`product-feed-item ${listMode}`}>

            <section className='product-feed-item-img-vp'> 
                <img alt="Ilustração do produto" src={ProductImage}></img>
            </section>

            <section className='product-feed-item-body'>
                <span className="produto-nome">{specification}</span>
                <span className="produto-brand">{brand.label}</span>
                <span className="produto-preço">
                    R$: 00,00
                </span>
            </section>
            <section className='product-feed-item-footer'>
                { !count ? <SubmitButton  onClick={()=>toAdd(produto)}> Adicionar </SubmitButton>
                : <CounterControl altType onInput={handleCounterInput} value={count}></CounterControl> } 
            </section>
        </div>
    )
}

export const INITIAL_LISTING_VIEW = {
    queries: {},
    total: 0,
    length: 0,
    data:[],                 
    pages: 0,                 
    pageIndex: 0
}

export const ProductFeed: React.FunctionComponent<any> = ({ more, listingView }) =>{

    const dispatch = useDispatch()
    var [ products, setProducts ] = useState<ListingView<Product[]>>({...INITIAL_LISTING_VIEW})
    const { cart } = useSelector((state: any)=>state.carrinho)

    useEffect(()=>{
        const data = listingView.data.products
        var products = { ...listingView}
        products.data = data
        setProducts(products)
    },[listingView]) 

    const addToCart =(novo_produto: any) =>  dispatch(pushToCart(novo_produto))
    const rmFromCart =(produto: any) => dispatch(removeFromCart(produto))
    
    const countProductQtd = (product_id:string) => {
        const item_index = cart.map((c:any)=> c.product.id ).indexOf(product_id);
        const item = cart[item_index];
        return item?.qtd ?? 0;
    }
    
    return (
        <div className="una-product-feed">
            <ContentPool 
                itemComponent={ ({item_data, key, listMode })=>(
                <ProductItem 
                    key={key}
                    listMode={listMode}
                    count={countProductQtd(item_data.id)} 
                    produto={item_data}
                    toAdd={addToCart}
                    toRemove={rmFromCart} ></ProductItem>)} 
                list_data={products} 
                onAction={more}>
            </ContentPool>
        </div>
    )
}

export default ProductFeed


