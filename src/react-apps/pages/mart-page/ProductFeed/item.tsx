import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import ProductImage from "@/public/assets/images/product/empty.svg"
import { useHistory } from 'react-router-dom'
import { ProductFeedCartButton } from './AddCartButton'
import { UseCartHandler } from '@/react-apps/store/reducers/cart/handler'
import StarImg from "@assets/icons/star.svg"
export type ListMode = "inline" | "block"
export namespace ProductItem {
    export type Params = { onChange: () => void, listMode: ListMode, showOptions: boolean }
}

export const ProductImageSection: React.FunctionComponent<any> = ({ images, onClick }) =>{
    
    const [ image, setImage ] = useState(ProductImage);

    useEffect(()=> {
        if(images.length == 0) return;
        var img = images[0];
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
    const { ean, specification, brand, quantity_per_unity, presentation_label, images, supplies} = produto
    const [ selectedSupply , setSelectedSupply ] = useState<any>(null)
    const cartHandler = UseCartHandler()

    var quantity = useMemo(()=>quantity_per_unity ?? 1,[produto])
    
    const sorted_supplies = useMemo(()=>{
        if(!supplies || supplies.length == 0) return [];
        return ([ ...supplies]).sort((a: any, b: any) => a?.price >  b?.price ? 1 : -1);
    },[ supplies])

    useEffect(()=>{
        if(!supplies || supplies.length == 0) return;
        setSelectedSupply(sorted_supplies[0])
    },[ sorted_supplies])

    const handleCartButtonClick = (k: "UP" | "DOWN" = "UP") =>{
        const supply = !selectedSupply ? null : { index: selectedSupply.index, supplier_id: selectedSupply.company_id } 
        const qtd = cartHandler.countByEan(ean, supply) ?? 0
        cartHandler.pushProduct(produto, qtd + (1 * (k =='UP' ? 1 : -1)), supply); 
    }

    const cartQuantity = ()=>{
        const supply = !selectedSupply ? null : { index: selectedSupply.index, supplier_id: selectedSupply.company_id } 
        return cartHandler.countByEan(ean, supply) ?? 0
    }

    const full_price = (!selectedSupply) ? 0 : (selectedSupply?.price)
    const unity_price = (!selectedSupply) ? 0 : (selectedSupply?.price / quantity)

    return (
        <div className={`product-feed-item ${listMode}`} >
            <header> 
                <ProductImageSection images={images}/>  
            </header>
            <main onClick={()=>{ history.push(`/produto/${ean}`) }}>
                <section className='produto-specifications'>
                    <span className="produto-nome"> {specification} </span>
                    <span className="produto-ean"> { ean } </span>
                </section>
                <div className='produto-pi-stars'>
                    {[...Array(5)].map((_,i)=>{
                        return (
                            <img key={i}src={StarImg}/>
                        )
                    })}
                </div>
                {
                    !selectedSupply ? 
                   
                    <section className='no-supply'>
                        Preço sobre orçamento
                    </section>
                        :
                    <section className='product-feed-item-prices'>
                        <span className='item-unit-price'>
                            R$: {unity_price.toFixed(2)+ " "} 
                            <span className="unidade-preco">und. </span>
                        </span>
                  
                        <span className="item-full-price"> 
                           <span className="price-hl"> R$: {full_price.toFixed(2)+ " "} </span> 
                           para a caixa com {quantity} unidade{quantity > 1 ? 's': ''}.
                        </span>

                        <span className="text-muted">
                            pedido minimo de { selectedSupply.minimum_order } caixa;
                        </span>
                       
                    </section> 
                }
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