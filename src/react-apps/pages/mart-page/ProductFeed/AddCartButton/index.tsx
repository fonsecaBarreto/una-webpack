import React from 'react'
import './style.css'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdExposurePlus1, MdOutlineAddCircle } from 'react-icons/md'
import { FaPlus, FaShoppingBasket } from 'react-icons/fa'
import { RiShoppingBasketFill } from 'react-icons/ri'
import { BsBagPlusFill } from 'react-icons/bs'

export namespace AddCartButton{
    export type Params = {
        value: number,
        onChange: () => void,

    }
}

export const ProductFeedCartButton = ({value =0, onChange}: any) => {
    return (
        <div className={`product-feed-cart-btn`}>

            { (value == 0) ? 
                <div className='product-feed-cart-btn-single'>
                    <button onClick={()=>onChange(1)}> <MdExposurePlus1/> </button>
                </div>
            :
                <div className={`product-feed-cart-btn-single-mulitples`}>
                    <button onClick={()=>onChange(-1)}>-</button>
                    <span> {value} </span>
                    <button onClick={()=>onChange(1)}>+</button>
                </div>
            } 
        </div>)
}



export default ProductFeedCartButton