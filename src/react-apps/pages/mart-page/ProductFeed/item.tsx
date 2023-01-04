import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import ProductImage from "@/public/assets/images/product/empty.svg"
import { useHistory } from 'react-router-dom'
import { ProductFeedCartButton } from './AddCartButton'
import { UseCartHandler } from '@/react-apps/store/reducers/cart/handler'
import StarImg from "@assets/icons/star.svg"
import { CreateCartItem_Id } from '@/react-apps/store/reducers/cart'
export type ListMode = "inline" | "block"
export namespace ProductItem {
    export type Params = {
      onChange: () => void;
      listMode: ListMode;
      showOptions: boolean;
      out: boolean;
    };
}


const isDateExpired = (date: Date) => {
    const hoje = new Date()
    return hoje > date;
}

export const ProductImageSection: React.FunctionComponent<any> = ({ images, onClick, out = false }) =>{
    
    const [ image, setImage ] = useState(ProductImage);

    useEffect(()=> {
        if(images.length == 0) return;
        var img = images[0];
        setImage(img)
    }, [images])

    return (
        <section className='product-feed-item-img-vp' onClick={onClick}> 
            <img alt="Ilustração do produto" src={image}></img>
            { out && <span className="product-out-of-stock"> Fora de estoque</span>}
        </section>
    )
}

export const ProductItem: React.FunctionComponent<any> = ({ onAction, showPriceFromWeight = false, produto, listMode}) =>{
    
    const history = useHistory()
    const { ean, specification, brand, weight, quantity_per_unity, image, supplies} = produto
    const cartHandler = UseCartHandler()

    
    const selectedSupply: any = useMemo(()=>{
        if(!supplies || supplies.length == 0) return null;
        const sorted_supplies = ([ ...supplies])
        .sort((a: any, b: any) =>{
            return  ((a?.price >  b?.price) && !isDateExpired(a.expiration)) ? 1 : -1
        }
        );

        return sorted_supplies[0];

    },[ supplies])

    const handleCartButtonClick = (k: "UP" | "DOWN" = "UP") =>{
        const item_id = CreateCartItem_Id(ean, selectedSupply?.index, selectedSupply?.company_id)
        const qtd = cartHandler.countBy_id(item_id) ?? 0
        cartHandler.pushProduct(item_id, produto, qtd + (1 * (k =='UP' ? 1 : -1))); 
    }

    const cartQuantity = ()=>{
        return cartHandler.countBy_id(CreateCartItem_Id(ean, selectedSupply?.index, selectedSupply?.company_id)) ?? 0
    }
 
    const renderSupply = useCallback(() => {
        if(!selectedSupply) return <></>;


        const { price } = selectedSupply;

        var quantity = produto.quantity_per_unity ?? 1;

        const full_price = price ?? 0;
        const unity_price = (full_price / (quantity ?? 1));
        const weight_price = (full_price) / ((weight ?? 1) * (quantity ?? 1));

        const expiration_date_str = new Date(selectedSupply.expiration).toLocaleDateString().split("T")[0];




        const principalPrice = showPriceFromWeight ?  weight_price : unity_price;
        

        return <section className='product-feed-item-prices'>

            <span className='item-unit-price'>
                R$: {principalPrice.toFixed(2)+ " "} 
                <span className="unidade-preco"> / {showPriceFromWeight ? "Kg." : "und."}</span>
            </span>
    
            <span className="item-full-price"> 
                Preço total:
                <span className="price-hl"> R$: {full_price.toFixed(2)+ " "} </span> 
                ( {quantity ?? 1} unidade{quantity > 1 ? 's': ''}. )
            </span>

            <span className="text-muted">
                pedido minimo: { selectedSupply.minimum_order };
            </span>

            <span className='carousel-pi-notation'>
                {
                    `Preços validos até ${ expiration_date_str }`
                }
            </span>
        
    </section> 
    }, [ selectedSupply, produto])


    const headerImageHeader = useCallback(() =>{

        const isOutOfStock = !selectedSupply ? true : isDateExpired(new Date(selectedSupply.expiration))
        return <ProductImageSection images={[image]} out={isOutOfStock}/>  
    },[ selectedSupply, image])

    return (
        <div className={`product-feed-item ${listMode}`} >
            <header> 
                { headerImageHeader() }
            </header>
            <main onClick={()=>{ history.push(`/produto/${ean}`) }}>
                <section className='produto-specifications'>
                    <span className="produto-nome"> {specification} </span>
                </section>
                <div className='produto-pi-stars'>
                    {[...Array(5)].map((_,i)=>{
                        return (
                            <img key={i}src={StarImg}/>
                        )
                    })}
                </div>
                {
                    !selectedSupply ? <section className='no-supply'/> : renderSupply()
                }

               {/*  <span className="produto-ean"> { ean } </span> */}
            </main>
            <footer>
                {cartQuantity() == 0 ? 
                    <button className='product-feed-item-add-button' onClick={()=>handleCartButtonClick("UP")}>
                        Adicionar 
                    </button> 
                    :
                    <div className='product-feed-item-flex-button'>
                        <button onClick={()=>handleCartButtonClick("DOWN")}>
                            - 1 
                        </button> 
                        <span>
                            {cartQuantity()}
                        </span>
                        <button onClick={()=>handleCartButtonClick("UP")}>
                            &#43; 1
                        </button> 
                    </div>
                }
            </footer>
        </div>
    )
}