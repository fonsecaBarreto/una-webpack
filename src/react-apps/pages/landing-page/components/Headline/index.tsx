import React from 'react'
import "./style.css"

export const Headline: React.FunctionComponent<any> = () =>{
    return (
        <div className='landing-pages-search-box'>
            <div className='lp-search-box-container'>
                <div className='lp-search-box-info'>
                    <h2> Una A praticidade de comprar ao melhor preço</h2>
                    <span> 
                        Uma plataforma digital para empresários reduzirem custos, 
                        conectando o comprador ao fornecedor, simplificando o processo de compras.
                    </span>
                </div>
                <div className='lp-search-box-inputs'>
                    <input></input>
                    <button> OK </button>
                </div>
            </div>
        </div>
    )
}

export default Headline