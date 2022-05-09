import React from 'react'
import './style.css'
import { BsCartPlus } from 'react-icons/bs'

export namespace AsideCartButton{
    export type Params = {
        value: number,
        onChange: () => void,

    }
}

export const AsideCartButton = ({value =0, onChange}: any) => {
    return (
        <div className={`aside-cart-btn`}>
            <section>
                <button onClick={()=>onChange(-1)}>-</button>
                <span> {value} </span>
                <button onClick={()=>onChange(1)}>{value == 0 ? <BsCartPlus/>: "+"}</button>
            </section>
        </div>)
}



export default AsideCartButton