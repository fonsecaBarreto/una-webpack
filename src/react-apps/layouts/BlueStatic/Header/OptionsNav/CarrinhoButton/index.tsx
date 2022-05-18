import React from 'react'
import './style.css'
import CartIcon from "@assets/icons/shopping-cart.svg"

export const CarrinhoButton: React.FunctionComponent<any> = ({onClick, count }) =>{
    return (
        <React.Fragment>
           
              <button className="carrinho-button" onClick={onClick} >
                    <img src={CartIcon}/>
                    { count > 0 && <span className="carinho-float-indicator">{count}</span>}
              </button>
        </React.Fragment>
    )
}

export default CarrinhoButton