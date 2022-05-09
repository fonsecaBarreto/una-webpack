import React, { useState, useEffect, useRef } from 'react'
import ProductImage from "@/public/assets/images/product/empty.svg"
import { Link, useHistory } from 'react-router-dom'
import { RiPriceTag2Line } from 'react-icons/ri'
import AddCartButton, { ProductFeedCartButton } from './AddCartButton'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { mediaPlayListService } from '@/services/api/media-playlist'
import { UseCartHandler } from '@/react-apps/store/reducers/cart/handler'
import { filesService } from '@/services/api/files-service'
import { HiPlusCircle } from 'react-icons/hi'
import { FaCartPlus } from 'react-icons/fa'
import { MdContentCopy, MdOutlineAddCircle, MdOutlineAddShoppingCart } from 'react-icons/md'
import copy from 'copy-to-clipboard';

export type ListMode = "inline" | "block"

export namespace ProductItem {
    export type Params = { onChange: () => void, listMode: ListMode, showOptions: boolean }
}

export const ProductImageSection: React.FunctionComponent<any> = ({ images, onClick }) =>{
    
    const [ image, setImage ] = useState(ProductImage);

    useEffect(()=> {
        if(images.length == 0) return;
        var image = images[0];
        const src= image + "/" + "320.jpeg";
        setImage(filesService.get_public_images_url(src))
    }, [images])

    return (
        <section className='product-feed-item-img-vp' onClick={onClick}> 
            <img alt="Ilustração do produto" src={image}></img>
        </section>
    )
}

export const ProductItem: React.FunctionComponent<any> = ({ onAction, showOptions, produto, listMode }) =>{
    
    const history = useHistory()
    const [ prices, setPrices ] = useState([0,0])
    const { ean, specification, brand, presentation, images, supplies} = produto
    const cartHandler = UseCartHandler()
    const eanRef = useRef<any>(null)
    useEffect(()=>{
        if(supplies?.length > 0 ){
            let maior:number =-1, menor: number = -1;

            for(let n = 0 ; n < supplies.length ; n ++ ){
                let {price}  = supplies[n]
                if(maior == -1){
                    maior = price, menor = price;
                }else{
                    maior = price > maior ? price : maior;
                    menor = price < menor ? price : menor;
                }
            }
            setPrices([menor, maior]);
        }
    },[ supplies])

    const handleClick = (k: string, p?:any) =>{
        switch(k){
            case "COPY": copy(ean); break;
            case "MOVE": history.push(`/produto/${ean}`) ;break;
            case "CART": cartHandler.push(p, produto); break;
        }
    }

    return (
        <div className={`product-feed-item ${listMode}`} >
            { showOptions && <button onClick={()=>onAction("ADMIN", produto.ean)} className='product-feed-options'> <BsThreeDotsVertical/> </button> }
            <ProductFeedCartButton 
                onChange={(n:number)=>{handleClick("CART", n)}}
                value={cartHandler.count(ean)} />
            <ProductImageSection images={images}/>
            <section className='product-feed-item-body' onClick={()=>{ handleClick("MOVE")}}>

                <span className="produto-nome"> {specification} </span>
                <div className='product-feed-item-prices'>
                    <span className={`${prices[0] ==0 ? 'priceless' : ""}`}>
                       {    prices[0] == 0 ?
                            <React.Fragment> Preço sobre orçamento </React.Fragment> :
                            <React.Fragment>  R$: {prices[0].toFixed(2)} </React.Fragment>
                        }
                    </span>
                    <span>
                        { prices[0] != prices[1] && 
                            <React.Fragment>
                                {`orfertas de ${prices[0].toFixed(2)} até ${prices[1].toFixed(2)}`}
                            </React.Fragment>
                        }
                    </span>
                </div>      
            </section>
            <section className='product-feed-item-footer'>
                <button onClick={() => handleClick("COPY")}> <MdContentCopy></MdContentCopy></button>
                <span ref={eanRef} className="produto-ean">{ean}</span> 
            </section>
        </div>
    )
}