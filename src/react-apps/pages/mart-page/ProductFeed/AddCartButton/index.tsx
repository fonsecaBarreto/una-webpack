import React from 'react'
import './style.css'
import { IoIosAddCircleOutline } from 'react-icons/io'

export namespace AddCartButton{
    export type Params = {
        value: number,
        onChange: () => void,
        fill: boolean
        height: string
    }
}

export const AddCartButton = ({value =0, onChange, fill, height="36px"}: any) => {
    return (
        <div className={`una-add-cart-control ${fill ? "fill": ""}`} style={{height}}>
            { (value == 0) ? <button  onClick={()=> onChange(1)}> Adicionar <IoIosAddCircleOutline/> </button>
            :
            <div className={`una-add-cart-control-counter `}>
                <button onClick={()=>onChange(-1)}>-</button>
                <span> {value} </span>
                <button onClick={()=>onChange(1)}>+</button>
            </div>
            } 
        </div>)
}

export default AddCartButton