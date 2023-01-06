
import React, { useState } from 'react'
import './style.css'
import ToggleButton from "../../components/ToggleButton"
import LogoImg from '@/public/assets/images/logo.svg' 

import OptionsNav from './OptionsNav'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'qs'
import SearchBar from '../../components/SearchBar'

export namespace PrimaryHeader {
    export type Params = {
        menuContext: any,
        onChange: any
    }
}

export const PrimaryHeader: React.FunctionComponent<PrimaryHeader.Params> =  ({ onChange, menuContext })=> {

    const history = useHistory();
    const location = useLocation()
    const [ searchText, setSearchText ] = useState("")

    const toSearch =() => { 
        const queryParams = qs.parse(location.search);
        const newQueries = { ...queryParams, v: searchText, p: 1};
        history.push({ pathname:"/mercado",search: qs.stringify(newQueries) });
    }

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

                <section className='mobile-only'>
                    <SearchBar 
                        showCancel={false}
                        value={searchText} 
                        onClick={toSearch}
                        onInput={setSearchText} 
                        onCancel={()=>{}}/> 
                </section>
            </div> 

        
        </header> 
    )
}

export default PrimaryHeader
