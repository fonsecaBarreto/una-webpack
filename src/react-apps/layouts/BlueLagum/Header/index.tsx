
import React, { useState } from 'react'
import './style.css'
import ToggleButton from "../../components/ToggleButton"
import LogoImg from '@/public/assets/images/logo.svg' 

import OptionsNav from './OptionsNav'

export namespace PrimaryHeader {
    export type Params = {
        menuContext: any,
        onChange: any
    }
}

export const PrimaryHeader: React.FunctionComponent<PrimaryHeader.Params> =  ({ onChange, menuContext })=> {
    return (
        <header className="primary-header">
            <div className="primary-header-content app-container">

                <section>
                    <ToggleButton onClick={menuContext.toggleMenu}></ToggleButton>
                    <a href="/" className="bluelagum-logo-link">
                        <img src={ LogoImg  }/>
                    </a>
              
                </section>

                <section>
                    <OptionsNav 
                        openBudgets={()=>onChange("BUDGETS")}
                        toggleMenu={menuContext.toggleMenu} 
                        toggleCart={()=>onChange("CART")}/>
                </section>
            </div> 
        </header> 
    )
}

export default PrimaryHeader
