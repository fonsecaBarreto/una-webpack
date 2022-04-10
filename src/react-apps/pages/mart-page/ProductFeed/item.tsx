import React, { useState, useEffect } from 'react'
import ProductImage from "@/public/assets/images/product/empty.svg"
import { Link } from 'react-router-dom'
import { RiPriceTag2Line } from 'react-icons/ri'
import AddCartButton from './AddCartButton'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { mediaPlayListService } from '@/services/api/media-playlist'

export type ListMode = "inline" | "block" 
export namespace ProductItem {
    export type Params = {
        onChange: () => void
        count: number,
        listMode: ListMode,
        showOptions: boolean,
        onAction: () => void
    }
}

export const ProductImageSection: React.FunctionComponent<any> = ({playlist_id}) =>{
    const [ image, setImage ] = useState(ProductImage);
    useEffect(()=> {
        if(!playlist_id) return;
        mediaPlayListService.getImageSrc(playlist_id).then(setImage)
    }, [playlist_id])
    return (
        <section className='product-feed-item-img-vp'> 
            <img alt="Ilustração do produto" src={image}></img>
        </section>
    )
}

export const ProductItem: React.FunctionComponent<any> = ({ onAction, showOptions, produto, onChange, count, listMode }) =>{
    const { specification, image, brand, ean } = produto

    const handleCounterInput = (n:number) =>{
        switch(n){
            case -1 : return onChange("REMOVE",produto);
            case +1 : return onChange("ADD",produto);
            default: break;
        }
    }
    return (
        <div className={`product-feed-item ${listMode}`}>

            { showOptions && <button onClick={()=>onAction("ADMIN", produto.ean)} className='product-feed-options'> <BsThreeDotsVertical/> </button> }
            
            <ProductImageSection playlist_id={produto.media_playlist_id} />

            <section className='product-feed-item-body'>
                <Link to={`/produto/${ean}`} className="produto-nome">{specification} </Link>
                <span className="singleline-text produto-ean">{ean}</span>
                <span className="singleline-text produto-brand"> <RiPriceTag2Line/>{brand.label}</span>
            </section>

            <section className='product-feed-item-footer'>
                <AddCartButton value={count} onChange={handleCounterInput}></AddCartButton>
            </section>
        </div>
    )
}