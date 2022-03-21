import React from 'react'
import ProductImage from "@/public/assets/images/shopping-bag.jpg"
import CounterControl from '../../../components/una/inputs-control/CounterControl'
import SubmitButton from '../../../components/una/inputs-control/SubmitButton'

export type ListMode = "inline" | "block" 
export namespace ProductItem {
    export type Params = {
        toAdd: () => void
        toRemove: () => void,
        count: number,
        listMode: ListMode
    }
}

export const ProductItem: React.FunctionComponent<any> = ({produto, toAdd, toRemove, count, listMode }) =>{
    const { specification, image, brand, ean } = produto

    const handleCounterInput = (n:number) =>{
        switch(n){
            case -1 : return toRemove(produto)
            case 1 : return toAdd(produto)
            default: break;
        }
    }
    return (
        <div className={`product-feed-item ${listMode}`}>

            <section className='product-feed-item-img-vp'> 
                <img alt="Ilustração do produto" src={ProductImage}></img>
            </section>

            <section className='product-feed-item-body'>
                <span className="produto-nome">{specification} </span>
                <span className="produto-brand">{ean}</span>
                <span className="produto-brand">{brand.label}</span>
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