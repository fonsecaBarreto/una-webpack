
import React, { useState } from 'react'
import './style.css'
import LogoImg from '@/public/assets/images/logo.svg' 
import { Link, useHistory, useLocation } from 'react-router-dom'

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
                </section>
            </div> 
        </header> 
    )
}

export default PrimaryHeader
