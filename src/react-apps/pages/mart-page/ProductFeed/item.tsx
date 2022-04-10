import React from 'react'
import ProductImage from "@/public/assets/images/shopping-bag.jpg"
import CounterControl from '../../../components/una/inputs-control/CounterControl'
import { Link } from 'react-router-dom'
import { RiPriceTag2Line } from 'react-icons/ri'
import { FaBars } from 'react-icons/fa'
import { IoIosAddCircleOutline } from 'react-icons/io'

export type ListMode = "inline" | "block" 
export namespace ProductItem {
    export type Params = {
        toAdd: () => void
        toRemove: () => void,
        count: number,
        listMode: ListMode,
        showOptions: boolean,
        onAction: () => void
    }
}

export const ProductItem: React.FunctionComponent<any> = ({ onAction, showOptions, produto, toAdd, toRemove, count, listMode }) =>{
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

            { showOptions && <button onClick={()=>onAction("ADMIN", produto.ean)} className='product-feed-options'> <FaBars/> </button> }
            
            <section className='product-feed-item-img-vp'> 
                <img alt="Ilustração do produto" src={ProductImage}></img>
            </section>

            <section className='product-feed-item-body'>
                <Link to={`/produto/${ean}`} className="produto-nome">{specification} </Link>
                <span className="singleline-text produto-ean">{ean}</span>
                <span className="singleline-text produto-brand"> <RiPriceTag2Line/>{brand.label}</span>
            </section>

            <section className='product-feed-item-footer'>
                { !count ? <button  onClick={()=>toAdd(produto)}> Adicionar <IoIosAddCircleOutline/> </button>
                : <CounterControl altType onInput={handleCounterInput} value={count}></CounterControl> } 
            </section>
        </div>
    )
}