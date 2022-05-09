import React from 'react'
import './style.css'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdExposurePlus1, MdOutlineAddCircle } from 'react-icons/md'
import { FaPlus, FaShoppingBasket } from 'react-icons/fa'
import { RiShoppingBasketFill } from 'react-icons/ri'
import { BsCartPlus } from 'react-icons/bs'

export namespace AddCartButton{
    export type Params = {
        value: number,
        onChange: () => void,

    }
}

export const ProductFeedCartButton = ({value =0, onChange}: any) => {
    return (
        <div className={`product-feed-cart-btn ${value == 0 ? "single" : ""}`}>
            <section>
                { value > 0 && <React.Fragment>
                    <button onClick={()=>onChange(-1)}>-</button>
                    <span> {value} </span>
                </React.Fragment>}
                <button onClick={()=>onChange(1)}>{value == 0 ? <BsCartPlus/>: "+"}</button>
            </section>
        </div>)
}



export default ProductFeedCartButton