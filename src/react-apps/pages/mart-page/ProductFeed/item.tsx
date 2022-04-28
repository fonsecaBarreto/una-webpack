import React, { useState, useEffect } from 'react'
import ProductImage from "@/public/assets/images/product/empty.svg"
import { Link } from 'react-router-dom'
import { RiPriceTag2Line } from 'react-icons/ri'
import AddCartButton from './AddCartButton'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { mediaPlayListService } from '@/services/api/media-playlist'
import { UseCartHandler } from '@/react-apps/store/reducers/cart/handler'
import { filesService } from '@/services/api/files-service'

export type ListMode = "inline" | "block" 

export namespace ProductItem {
    export type Params = { onChange: () => void, listMode: ListMode, showOptions: boolean }
}

export const ProductImageSection: React.FunctionComponent<any> = ({ images }) =>{
    
    const [ image, setImage ] = useState(ProductImage);

    useEffect(()=> {
        if(images.length == 0) return;
        var image = images[0];
        const src= image + "/" + "320.jpeg";
        setImage(filesService.get_public_images_url(src))
    }, [images])

    return (
        <section className='product-feed-item-img-vp'> 
            <img alt="Ilustração do produto" src={image}></img>
        </section>
    )
}

export const ProductItem: React.FunctionComponent<any> = ({ onAction, showOptions, produto, listMode }) =>{
    
    const { ean, specification, brand, presentation, images} = produto
    const cartHandler = UseCartHandler()

    return (
        <div className={`product-feed-item ${listMode}`}>

            { showOptions && <button onClick={()=>onAction("ADMIN", produto.ean)} className='product-feed-options'> <BsThreeDotsVertical/> </button> }
            
            <ProductImageSection images={images} />

            <section className='product-feed-item-body'>
                <Link to={`/produto/${ean}`} className="produto-nome"> {specification} </Link>
                <span className="singleline-text produto-ean"> Contém: {presentation.quantity} unidades</span>
                <span className="singleline-text produto-ean">{ean}</span>
                <span className="singleline-text produto-brand"> <RiPriceTag2Line/>{brand.label}</span>
            </section>

            <section className='product-feed-item-footer'>

            <AddCartButton fill={true} value={cartHandler.count(ean)} 
                onChange={(n:number)=>{cartHandler.push(n, produto)}}></AddCartButton>

            </section>
        </div>
    )
}