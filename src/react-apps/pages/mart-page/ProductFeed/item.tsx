import React, { useState } from 'react'
import ProductImage from "@/public/assets/images/shopping-bag.jpg"
import CounterControl from '../../../components/una/inputs-control/CounterControl'
import { Link } from 'react-router-dom'
import { RiPriceTag2Line } from 'react-icons/ri'
import { FaBars } from 'react-icons/fa'
import { IoIosAddCircleOutline } from 'react-icons/io'
import AddCartButton from './AddCartButton'

export type ListMode = "inline" | "block" 
export namespace ProductItem {
    export type Params = {
        onChange: () => void
        count: number,
        listMode: ListMode,
        showOptions: boolean,
        onAction: () => void
    }
}

export const ProductImageSection: React.FunctionComponent<any> = ({playlist_id}) =>{
    const [ image, setImage ] = useState(ProductImage);
    return (
        <section className='product-feed-item-img-vp'> 
            <img alt="Ilustração do produto" src={ProductImage}></img>
        </section>
    )
}

export const ProductItem: React.FunctionComponent<any> = ({ onAction, showOptions, produto, onChange, count, listMode }) =>{
    const { specification, image, brand, ean } = produto

    const handleCounterInput = (n:number) =>{
        switch(n){
            case -1 : return onChange("REMOVE",produto);
            case +1 : return onChange("ADD",produto);
            default: break;
        }
    }
    return (
        <div className={`product-feed-item ${listMode}`}>

            { showOptions && <button onClick={()=>onAction("ADMIN", produto.ean)} className='product-feed-options'> <FaBars/> </button> }
            
            <ProductImageSection/>

            <section className='product-feed-item-body'>
                <Link to={`/produto/${ean}`} className="produto-nome">{specification} </Link>
                <span className="singleline-text produto-ean">{ean}</span>
                <span className="singleline-text produto-brand"> <RiPriceTag2Line/>{brand.label}</span>
            </section>

            <section className='product-feed-item-footer'>
                <AddCartButton value={count} onChange={handleCounterInput}></AddCartButton>
            </section>
        </div>
    )
}