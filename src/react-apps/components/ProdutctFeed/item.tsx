import React from 'react'
import FlourImage from '@/public/assets/images/flour.png'


export namespace ProductItem {
    export type Params = {
        add: () => void
        remv: () => void
    }
}

export const ProductItem: React.FunctionComponent<any> = ({produto, add, remv}) =>{
    const {   especificacao, image } = produto
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
                    <button onClick={()=>add(produto)}> Adicionar + </button>
                    <button onClick={()=>remv(produto)}> Remover - </button>
                </section>
            </div>
    )
}

export default ProductItem