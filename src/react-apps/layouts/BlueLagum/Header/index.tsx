
import React, { useContext, useState } from 'react'
import './style.css'
import ToggleButton from "../../components/ToggleButton"
import LogoImg from '@/public/assets/images/logo-alt-dark.png' 
import SearchBar from '../SearchBar'
import OptionsNav from './OptionsNav'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useWindowSize } from 'fck-components/lib/utils/hooks'

export namespace PrimaryHeader {
    export type Params = {
        toggleCart: () => void,
    }
}

export const PrimaryHeader: React.FunctionComponent<PrimaryHeader.Params> =  ({ toggleCart })=> {

    const dispatch = useDispatch()
    const [ especificacao, setEspecificacao ] = useState("")
    const { width } = useWindowSize()

    const toSearch =() => {
        alert("Pesquisa independente deve ser implentada aqui")
        //dispatch(spliceProdutosQueries({ specification: especificacao }))
    }

    return (
        <header className="primary-header">
            <div className="primary-header-content app-container">
                <section>
                   
                    <Link to="/" className="bluelagum-logo-link">
                        <img src={LogoImg}></img>  
                    </Link>
                </section> 

                {
                    width > 960 ?
                    <React.Fragment>
                        <section>
                           {/*  <SearchBar value={especificacao} onInput={(v)=>setEspecificacao(v)} onClick={toSearch}></SearchBar> */}
                        </section>
                        <section>
                            <OptionsNav toggleCart={toggleCart}></OptionsNav>
                        </section>
                    </React.Fragment> :

                    <React.Fragment>
                        <section> </section>
                        <section>
                            <ToggleButton ></ToggleButton> 
                        </section>
                    </React.Fragment>
                }
            </div> 
        </header> 
    )
}

export default PrimaryHeader
