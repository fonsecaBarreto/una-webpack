
import React, { useContext, useState } from 'react'
import './style.css'
import ToggleButton from '../ToggleButton'
import LogoImg from '@/public/assets/images/logo.svg' 
import SearchBar from '../SearchBar'
import OptionsNav from './OptionsNav'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ProductListView } from '@/domain/views/Produto'
import { produtosService } from '@/services/produtos-service'
export namespace PrimaryHeader {
    export type Params = {
        toggleCart: () => void,
    }
}

export const PrimaryHeader: React.FunctionComponent<PrimaryHeader.Params> =  ({ toggleCart })=> {

    const { produtos_feed } = useSelector( (state: any)=>state.departamentos)
    const [ especificacao, setEspecificacao ] = useState("")

    const toSearch =() => {
        const listingView: ProductListView = { ...produtos_feed };
        const { pageIndex, queries } = listingView
        return produtosService.list({  ...queries, p: 1, e: especificacao }) 
    }

    return (
    
        <header className="primary-header">
            <div className="primary-header-content app-container">
                <section>
                    <ToggleButton ></ToggleButton> 
                    <Link to="/">
                        <img className="bluelagum-logo" src={LogoImg}></img>  
                    </Link>
                </section> 
                <section>
                    <SearchBar value={especificacao} onInput={(v)=>setEspecificacao(v)} onClick={toSearch}></SearchBar>
                </section>
                <section>
                    <OptionsNav toggleCart={toggleCart}></OptionsNav>
                </section>
            </div> 
        </header> 
    )
}

export default PrimaryHeader
