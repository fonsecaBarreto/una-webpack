
import React, { useContext, useState } from 'react'
import './style.css'
import ToggleButton from "../ToggleButton"
import LogoImg from '@/public/assets/images/logo.svg' 
import SearchBar from '../SearchBar'
import OptionsNav from './OptionsNav'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Produto } from '@/domain/views/Produto'
import { produtosService } from '@/services/api/produtos-service'
import { ListingView } from '@/domain/views/ListingView'
import { setMarcasAvailables, setProdutos } from '@/react-apps/store/reducers/departaments/actions'
export namespace PrimaryHeader {
    export type Params = {
        toggleCart: () => void,
    }
}

export const PrimaryHeader: React.FunctionComponent<PrimaryHeader.Params> =  ({ toggleCart })=> {

    const dispatch = useDispatch()
    const { produtos } = useSelector( (state: any)=>state.departamentos)
    const [ especificacao, setEspecificacao ] = useState("")

    const toSearch =() => {
        const { pageIndex, queries }: ListingView<Produto> = { ...produtos };
        produtosService.list({  ...queries, p: 1, e: especificacao }).then((data: any)=>{
            var produtosListView = { ...data, data: [ ...data.data.produtos ]}
            dispatch(setProdutos(produtosListView, false));
            dispatch(setMarcasAvailables(data.data.marcas))
        })
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
