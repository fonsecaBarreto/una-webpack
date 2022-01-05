
import React from 'react'
import './style.css'
import ToggleButton from '../ToggleButton'
import Logo from '@/public/assets/images/logo-alt.svg' 
import { IoMdCart } from 'react-icons/io'
import { FaUserCircle } from "react-icons/fa"
import SearchBar from '../SearchBar'
export const PrimaryHeader: React.FunctionComponent<any> =  ()=> {
    return (
    
        <header className="primary-header">
            <div className="primary-header-content app-container">

                <section>
                    <ToggleButton ></ToggleButton> 
                    <img className="bluelagum-logo" src={Logo}></img>  
                </section> 

                <section>
                    <SearchBar></SearchBar>
                </section>

                <section className='primary-header-content-option'>
                    <button><FaUserCircle></FaUserCircle></button>
                    <button><IoMdCart></IoMdCart></button>
                </section>

            </div> 
        </header> 
    )
}

export default PrimaryHeader