import React, { useEffect } from 'react'
import './style.css'
import Banner from '@/public/assets/images/cardume.png'
import HeadLineCurve from '@/public/assets/images/headline-curve.svg' 
import LogoImg from '@/public/assets/images/logo-alt-dark.png' 
import { useHistory } from 'react-router-dom'
export default () =>{

    const  history = useHistory()
    const goTo = () =>{
        return window.location.href="/login?v=signup"
        return history.push('/inicio/#objetivos') 
    }
    return (
        <div id="head-line" >
            <div className="app-container">
                <div className="head-line-text-container">
                    <h1> Una A praticidade de comprar ao melhor preço</h1>
                    <h3> Uma plataforma digital para empresários reduzirem custos, conectando o comprador ao fornecedor, simplificando o processo de compras. </h3>
                    <button className="soft-btn" onClick={goTo}> CADASTRE-SE GRATIS </button>
                </div> 
            {/*     <img src={Banner}></img>  */}
            </div>
          {/*    <img className="headline-curve" src={HeadLineCurve}></img>  */}
        </div>
    )
}