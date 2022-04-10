import React from 'react'
import './style.css'
import CounterControl from '@/react-apps/components/una/inputs-control/CounterControl'
import { IoIosAddCircleOutline } from 'react-icons/io'

export const AddCartButton = ({value =0, onChange}: any) => {
    return (
        <div className="una-add-cart-control">
            { (value == 0) ? <button  onClick={()=> onChange(1)}> Adicionar <IoIosAddCircleOutline/> </button>
            : <CounterControl onInput={onChange} value={value}></CounterControl> } 
        </div>)
}

export default AddCartButton