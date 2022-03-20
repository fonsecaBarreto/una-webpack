
import React, { useContext, useState } from 'react'
import './style.css'
import ToggleButton from "../../components/ToggleButton"
import LogoImg from '@/public/assets/images/logo-alt-dark.png' 
import SearchBar from '../SearchBar'
import OptionsNav from './OptionsNav'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useWindowSize } from 'fck-components/lib/utils/hooks'
import qs from 'query-string';

export namespace PrimaryHeader {
    export type Params = {
        toggleCart: () => void,
    }
}

export const PrimaryHeader: React.FunctionComponent<PrimaryHeader.Params> =  ({ toggleCart })=> {

    const history = useHistory();
    const location = useLocation()
    const [ especificacao, setEspecificacao ] = useState("")
    const { width } = useWindowSize()

    const toSearch =() => { 
        const queryParams = qs.parse(location.search);
        const newQueries = { ...queryParams, v: especificacao};
        history.push({ search: qs.stringify(newQueries) });
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
                        <SearchBar value={especificacao} onInput={(v)=>setEspecificacao(v)} onClick={toSearch}></SearchBar> 
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
