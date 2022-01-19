
import React, { useContext, useState } from 'react'
import './style.css'
import ToggleButton from "../../components/ToggleButton"
import LogoImg from '@/public/assets/images/logo.svg' 
import { Link } from 'react-router-dom'

export namespace BlueLakeHeader {
    export type Params = {
        menuState: { show: boolean, toggle: Function }
    }
}

export const BlueLakeHeader: React.FunctionComponent<BlueLakeHeader.Params> =  ({ menuState })=> {

    return (
        <header className="blue-lake-header">
            <div className="blue-lake-header-content">
                <section>
                 {/*    <Link to="/" className="bluelagum-logo-link">
                        <img src={LogoImg}></img>  
                    </Link> */}
                  {/*   <ToggleButton onClick={menuState.toggle}></ToggleButton>  */}
                </section> 
            </div> 
        </header> 
    )
}

export default BlueLakeHeader
