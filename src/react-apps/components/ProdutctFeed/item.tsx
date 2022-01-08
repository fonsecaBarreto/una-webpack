import React from 'react'
import FlourImage from '@/public/assets/images/flour.png'
import SubmitButton from "@/react-apps/components/una/SubmitButton"


export const ProductItem: React.FunctionComponent<any> = ({produto}) =>{

    const { 
            id,
            marca_id,
            especificacao,
            image,
     } = produto
    return (
   
            <div className="product-feed-item">

                <section className='product-feed-item-img-vp'> 
                    <img alt="Ilustração do produto" src={FlourImage}></img>
                </section>

                <section className='product-feed-item-body'>
                    <span className="produto-nome">{especificacao}</span>
                    <span className="produto-preço">
                        R$: 00,00
                    </span>
                </section>
                <section className='product-feed-item-footer'>
                    <SubmitButton> Adicionar </SubmitButton>
                </section>
            </div>
    )
}

export default ProductItem