import React from 'react'
import "./style.css"
import { UseCartHandler } from "@/react-apps/store/reducers/cart/handler"
import CompanySupply from '../CompanySupply'
import { useSelector } from 'react-redux'


export const ProductInfo: React.FunctionComponent<any> = ({ product, supplies }) =>{
    const { user } = useSelector((state: any) => state.main)
    const cartHandler = UseCartHandler()
    return (
        <div className='product-page-info'>
            <div>
                <span className='product-page-specification'> 
                    <span> {product.specification}</span> 
                    <span> ( {product.presentation.label} ) </span>
                </span>
                <span className='product-page-code'>ean: {product.ean}</span> 
                <span className='product-page-brand'> <label>Marca:</label> {product.brand?.label}</span> 
                <span className='product-page-brand'> <label>Peso:</label> { !product.presentation?.weight ? "nao informado" : `${product.presentation?.weight} Kg`}</span> 
                <span className='product-page-brand'> <label>Volume:</label> { !product.presentation?.volume ? "nao informado" : `${product.presentation?.volume} L`}</span> 
            </div>

            <div>
                { !user ? <span className='product-page-info-priceless'> Cadastre-se para descobrir as ofertas </span> :
                    <div className='product-page-info-supplies'>
                        <section>
                            <span> Ofertas Para este item: </span>
                        </section>

                        <section>
                            {(supplies.length > 0) ? supplies.map((s: any, i:number)=>  ( <CompanySupply key={i} supply={s}/>) )
                            : 
                            <div className='company-supply-component'> 
                                <span></span>
                                <span> Preço sobre orçamento </span>
                            </div>
                            } 
                        </section>
                    </div>
                }
            </div>

            <div>
                <button onClick={()=> cartHandler.push(1, product)} className='product-add-cart-btn una-submit-button-color'> Adicionar ao carrinho </button> 
            </div>
        </div>
    )
}

export default ProductInfo


