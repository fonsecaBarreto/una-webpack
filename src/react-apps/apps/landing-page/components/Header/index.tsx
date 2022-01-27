
import React, { useContext, useState } from 'react'
import './style.css'
import ToggleButton from "@/react-apps/layouts/components/ToggleButton"
import LogoImg from '@/public/assets/images/logo.svg' 
import { useWindowSize } from 'fck-components/lib/utils/hooks'

export namespace LadingPageHeader {
    export type Params = {
    }
}

export const PrimaryHeader: React.FunctionComponent<LadingPageHeader.Params> =  ({ })=> {

/*     const { width } = useWindowSize()
 */
    return (
        <header className="lading-page-header">
            <div className="lading-page-header-content app-container">
               <section>
                    <a href="/home" className="langin-page-logo-link">
                        <img src={LogoImg}></img>  
                    </a>
                </section> 

                <section>
                    <ToggleButton ></ToggleButton> 
                </section>
           
            </div> 
        </header> 
    )
}

export default PrimaryHeader
