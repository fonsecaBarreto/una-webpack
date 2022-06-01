import React from 'react'
import './style.css'
import DocumentsIcons from "@assets/icons/cotacoes.svg"
export const CarrinhoButton: React.FunctionComponent<any> = ({onClick, className=""}) =>{
    return (
        <React.Fragment>
              <button className={`pedidos-button ${className}`} onClick={onClick} >
                    <img src={DocumentsIcons}/>
                    <span>
                        Minhas Cotações
                    </span>
              </button>
        </React.Fragment>
    )
}

export default CarrinhoButton