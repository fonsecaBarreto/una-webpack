import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector, useDispatch} from 'react-redux'
import { pushToCart, removeFromCart, setCart } from "@/react-apps/store/reducers/cart/actions"
import ContentPool from '@/react-apps/layouts/components/ContentPool'
import { ListingView } from '@/domain/views/ListingView'
import { Product } from '@/domain/views/Product'
import { ProductItem } from './item'

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
                itemComponent={ ({item_data, listMode })=>(
                <ProductItem 
                    listMode={listMode}
                    count={countProductQtd(item_data.id)} 
                    produto={item_data}
                    toAdd={addToCart}
                    toRemove={rmFromCart} ></ProductItem>)} 
                list_data={listingView} 
                dataAlias={"products"}
                onAction={more}>
            </ContentPool>
        </div>
    )
}

export default ProductFeed


