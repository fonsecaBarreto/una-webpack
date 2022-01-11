
import React, { useContext } from 'react'
import './style.css'
import ToggleButton from '../ToggleButton'
import LogoImg from '@/public/assets/images/logo.svg' 
import SearchBar from '../SearchBar'
import OptionsNav from './OptionsNav'
import { Link } from 'react-router-dom'

export namespace PrimaryHeader {
    export type Params = {
        toggleCart: () => void,
    }
}
export const PrimaryHeader: React.FunctionComponent<PrimaryHeader.Params> =  ({ toggleCart })=> {
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
                    <SearchBar></SearchBar>
                </section>
                <section>
                    <OptionsNav toggleCart={toggleCart}></OptionsNav>
                </section>
            </div> 
        </header> 
    )
}

export default PrimaryHeader
