import React, { useState, useEffect, useRef, useMemo } from 'react'
import ProductImage from "@/public/assets/images/product/empty.svg"
import { useHistory } from 'react-router-dom'
import { ProductFeedCartButton } from './AddCartButton'
import { UseCartHandler } from '@/react-apps/store/reducers/cart/handler'
import { filesService } from '@/services/api/files-service'
import copy from 'copy-to-clipboard';

export type ListMode = "inline" | "block"

export namespace ProductItem {
    export type Params = { onChange: () => void, listMode: ListMode, showOptions: boolean }
}

export const ProductImageSection: React.FunctionComponent<any> = ({ images, onClick }) =>{
    
    const [ image, setImage ] = useState(ProductImage);

    useEffect(()=> {
        if(images.length == 0) return;
        var img = images[0];
        //const src= image + "/" + "320.jpeg";
        //setImage(filesService.get_public_images_url(src))
        setImage(img)
    }, [images])

    return (
        <section className='product-feed-item-img-vp' onClick={onClick}> 
            <img alt="Ilustração do produto" src={image}></img>
        </section>
    )
}

export const ProductItem: React.FunctionComponent<any> = ({ onAction, showOptions, produto, listMode , showPrices}) =>{
    
    const history = useHistory()
    const [ prices, setPrices ] = useState([22,15])
    const { ean, specification, brand, quantity_per_unity, presentation_label, images, supplies} = produto
    const cartHandler = UseCartHandler()
    const eanRef = useRef<any>(null);


    var quantity = useMemo(()=>quantity_per_unity ?? 1,[produto])
    
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
            //setPrices([menor/quantity ?? 1, maior/quantity ?? 1]);
        }
    },[ supplies])

    const handleClick = (k: string, p?:any) =>{
        switch(k){
            case "COPY": 
                copy(ean);
                alert("Código de barras copiado com sucesso");
            break;
            case "MOVE": history.push(`/produto/${ean}`) ;break;
            case "CART": cartHandler.push(p, produto); break;
        }
    }

    return (
        <div className={`product-feed-item ${listMode}`} >

           { showOptions && <button onClick={()=>onAction("ADMIN", produto.ean)} className='product-feed-options'> &equiv; </button> } 
            <ProductFeedCartButton onChange={(n:number)=>{handleClick("CART", n)}} value={cartHandler.count(ean)} />
            
            {listMode == "block" ?
            <React.Fragment>
                <section> <ProductImageSection images={images}/>  </section>
                <section className='product-feed-item-body' onClick={()=>{ handleClick("MOVE")}}>
                    <span className="produto-nome"> {specification} </span>

                    <span className="produto-presentation"> {presentation_label } </span>
                        { showPrices ?
                            <div className='product-feed-item-prices'>
                                <span className={`${prices[0] ==0 ? 'priceless' : ""}`}>
                                    {    prices[0] == 0 ?
                                        <React.Fragment> Preço sobre orçamento! </React.Fragment> :
                                        <React.Fragment>  R$: {prices[0].toFixed(2)} <span className="unidade-preco">und. </span></React.Fragment>
                                    }
                                </span>
                                <span>
                                    { prices[0] != prices[1] && 
                                        <React.Fragment> 
                                            {`orfertas de ${prices[0].toFixed(2)} até ${prices[1].toFixed(2)}`} 
                                        </React.Fragment>}
                                </span>
                            </div> 
                            :
                            <div className='product-feed-item-prices'>
                                <span > Cadastre-se </span>
                                <span> para descobrir as ofertas </span>
                            </div> 
                        }
                </section>
                <section className='product-feed-item-footer'>
                    {   (listMode == "block") &&
                        <React.Fragment>
                            <span onClick={() => handleClick("COPY")} ref={eanRef} className="produto-ean"> {ean}</span>
                        </React.Fragment>
                    }
                </section>
            </React.Fragment>
            :
            <React.Fragment>
                <span> {specification} </span>
            </React.Fragment>
        
        }
          
        </div>
    )
}