import React from 'react'
//dependencies
import './style.css'
//componentss
import ToggleButton from '../ToggleButton'
import { IoIosArrowBack } from 'react-icons/io'

export function PrimaryHeader ({ history, menuState, currentPage=null }){
    return (
        <header className="primary-header">
            <div className="primary-header-content">
               <section>
                   { currentPage && 
                        <React.Fragment>
                            { 
                            (currentPage.breadCrumbs.length) > 1 && 
                                <button className="primary-header-back-btn" onClick={goBack}> 
                                    <IoIosArrowBack></IoIosArrowBack>
                                </button>
                            }

                            <div className="primary-header-title">
                                <span className="primary-header-title-label"> {   currentPage.title && currentPage.title } </span>
                                <span className="primary-header-title-bread-crumbs desktop-only">{}</span>
                            </div>
                        </React.Fragment>
                    } 
                </section> 
                <ToggleButton onClick={menuState.toToggle}></ToggleButton>
            </div>
        </header>
    )
}

export default PrimaryHeader