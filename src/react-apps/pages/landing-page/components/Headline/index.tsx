import React from 'react'
import "./style.css"
import SearchIcon from "@assets/icons/search.svg"
import Logo from "@assets/images/logo.svg"
export const Headline: React.FunctionComponent<any> = () =>{


    const [ searchText, setSearchText ] = React.useState("")

    const subtmit = () => {
        if(!window) return;
        window.location.href=`/mercado?v=${searchText}`;
    }
    return (
        <div className='landing-pages-search-box app-container'>
            <div className='lp-search-box-container'>
                <img className='head-line-logo' src={Logo}></img>
                <div className='lp-search-box-info'>
                    <h2> Una A praticidade de comprar ao melhor preço</h2>
                    <span> 
                        Uma plataforma digital para empresários reduzirem custos, 
                        conectando o comprador ao fornecedor, simplificando o processo de compras.
                    </span>
                </div>
                <div className='lp-search-box-inputs'>
                    <input 
                        placeholder='Conte-nos oque procura...'
                        value={searchText} 
                        onInput={(e: any)=>setSearchText(e.target.value)}></input>
                    <button onClick={subtmit}> <img src={SearchIcon}></img> </button>
                </div>
                <a href={`/mercado`}> leve me ao mercado </a>
            </div>
        </div>
    )
}

export default Headline