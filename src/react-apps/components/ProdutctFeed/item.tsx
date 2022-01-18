import React from 'react'
import ProductImage from "@/public/assets/images/shopping-bag.jpg"
import CounterControl from '../una/CounterControl'
import SubmitButton from '../una/SubmitButton'

export namespace ProductItem {
    export type Params = {
        toAdd: () => void
        toRemove: () => void,
        count: number,
    }
}

export const ProductItem: React.FunctionComponent<any> = ({produto, toAdd, toRemove, count }) =>{
    const { especificacao, image, marca } = produto
    const handleCounterInput = (n:number) =>{
        switch(n){
            case -1 : return toRemove(produto)
            case 1 : return toAdd(produto)
            default: break;
        }
    }
    return (
   
            <div className="product-feed-item">

                <section className='product-feed-item-img-vp'> 
                    <img alt="Ilustração do produto" src={ProductImage}></img>
                </section>

                <section className='product-feed-item-body'>
                    <span className="produto-nome">{especificacao}</span>
                    <span className="produto-brand">{marca.label}</span>
                    <span className="produto-preço">
                        R$: 00,00
                    </span>
                </section>
                <section className='product-feed-item-footer'>
                    { !count ? <SubmitButton  onClick={()=>toAdd(produto)}> Adicionar </SubmitButton>
                    : <CounterControl altType onInput={handleCounterInput} value={count}></CounterControl> } 
                </section>
            </div>
    )
}

export default ProductItem