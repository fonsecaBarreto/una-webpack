
import React, { useState } from 'react'
import './style.css'
import LogoImg from '@/public/assets/images/logo.svg' 
import { Link, useHistory, useLocation } from 'react-router-dom'
import UserIcon from "@assets/icons/user.svg"
export const PrimaryHeader: React.FunctionComponent<any> =  ({ })=> {
    return (
        <header className="bls-header">
            <div className="bls-header-content app-container">
                <section>
                    <button className={`bls-toggle-button`}> &equiv; </button> 
                    <Link to="/" className="bls-logo-link">
                        <img src={LogoImg}/>
                    </Link>
                </section>
                <section>
                    <nav className='bls-aside-header-nav'>
                        <a className='aside-user' href="/login?v=signup"> 
                            <img src={UserIcon} ></img>
                            <div>
                                <span>Cadastre-se</span> 
                                <span>Gratuitamente</span> 
                            </div>
                        </a>
                    </nav>
                </section>
            </div> 
        </header> 
    )
}

export default PrimaryHeader
