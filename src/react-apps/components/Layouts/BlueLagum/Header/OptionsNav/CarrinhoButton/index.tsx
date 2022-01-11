import React from 'react'
import './style.css'
import { IoMdCart } from 'react-icons/io'

export const CarrinhoButton: React.FunctionComponent<any> = ({onClick, count }) =>{
    return (
        <React.Fragment>
           
              <button className="carrinho-button" onClick={onClick} >
                    <IoMdCart></IoMdCart>
                    { count > 0 && <span className="carinho-float-indicator">{count}</span>}
              </button>
        </React.Fragment>
    )
}

export default CarrinhoButton