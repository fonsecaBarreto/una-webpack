import React from 'react'
import "./style.css"
import { UseCartHandler } from "@/react-apps/store/reducers/cart/handler"
import CompanySupply from '../CompanySupply'
import { BsFillPatchPlusFill } from 'react-icons/bs'

export const ProductInfo: React.FunctionComponent<any> = ({ product, supplies }) =>{
    const cartHandler = UseCartHandler()
    return (
        <div className='product-page-info'>
            <div>
                <span className='product-page-specification'>{product.specification}</span>
                <span className='product-page-brand'> <label>Marca:</label> {product.brand?.label}</span> 
                <span className='product-page-code'>{product.ean}</span> 
            </div>

            <div>
                <React.Fragment>
                    <section>
                        <span> Ofertas Para este item: </span>
                    </section>

                    <section>
                        {(supplies.length > 0) ? supplies.map((s: any)=>  ( <CompanySupply supply={s}/>) )
                        : 
                        <div className='company-supply-component'> 
                            <span></span>
                            <span> Preço sobre orçamento </span>
                        </div>
                        } 
                    </section>
                </React.Fragment>
            </div>

            <div>
                <button onClick={()=> cartHandler.push(1, product)} className='product-add-cart-btn una-submit-button-color'> Adicionar ao carrinho </button> 
            </div>
        </div>
    )
}

export default ProductInfo


