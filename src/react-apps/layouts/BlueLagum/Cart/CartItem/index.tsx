import React, { useEffect, useState } from 'react'
import './style.css'

import EmptyImage from "@/public/assets/images/product/empty.svg"
import AddCartButton from '../AsideCartButton'
import { UseCartHandler } from "@/react-apps/store/reducers/cart/handler"
import { filesService } from '@/services/api/files-service'

export namespace CartItem {
    export type Params = {
        item: any
    }
}

export const CartItem: React.FunctionComponent<CartItem.Params> = ({item}) =>{

    const [ image, setImage ] = useState(EmptyImage)
    const { product } = item
    
    const cartHandler = UseCartHandler()
    const handleChange = (n:number, c: string) =>{
        switch(c){
            case "PUSH":
                cartHandler.push(n, product);
            break;
            case "OVERWRITE": 
                cartHandler.overwrite(n, product)
            break;
        } 
    }

    useEffect(()=> {
        if(product.images.length == 0) return;
        var image = product.images[0];
        setImage(image)
       /*  const src= image + "/" + "96.jpeg";
        setImage(filesService.get_public_images_url(src)) */
    }, [product.images])

    return (
        <div className='layout-cart-item'>

            <section>
                <img src={image}></img>
            </section>

            <section>
                <span>{ product.specification} - {product.presentation}</span>
                <span>{ product.ean }</span>
            </section>

            <section>
                <AddCartButton value={cartHandler.count(product?.ean)} onChange={handleChange}></AddCartButton> 
            </section>  
           
        </div>
    )
}


export default CartItem