
import React, { useState } from 'react'
import './style.css'
import ToggleButton from "../../components/ToggleButton"
import LogoImg from '@/public/assets/images/logo.svg' 
import SearchBar from '../../components/SearchBar'
import OptionsNav from './OptionsNav'
import { Link, useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string';
import { useEffect } from 'react'
import UseWindowSize from '@/react-apps/components/utils/UseWindowSize'

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
    const { width } = UseWindowSize()
    const [ showSearchBar, setShowSearchBar ] = useState(false);

    const toSearch =() => { 
        const queryParams = qs.parse(location.search);
        const newQueries = { ...queryParams, v: searchText, p: 1};
        history.push({ search: qs.stringify(newQueries) });
    }
    
    useEffect(()=>{ if(width >960){ setShowSearchBar(false)} },[width])

    return (
        <header className="primary-header">
            <div className="primary-header-content app-container">

                <section>
                    <ToggleButton onClick={menuContext.toggleMenu}></ToggleButton>
                    { !showSearchBar && <Link to="/" className="bluelagum-logo-link">
                        <img src={LogoImg}/>
                    </Link>}
                </section>

                <section>
                {(!showSearchBar) ?
                    <React.Fragment>
                        <SearchBar className='desktop-only' value={searchText} onInput={setSearchText} onClick={toSearch}></SearchBar>
                        <OptionsNav 
                            openBudgets={()=>onChange("BUDGETS")}
                            toggleMenu={menuContext.toggleMenu} 
                            toggleCart={()=>onChange("CART")}
                            toggleSearch={()=>setShowSearchBar(true)}/>
                    </React.Fragment>
                :   <React.Fragment>
                        <SearchBar onCancel={()=>setShowSearchBar(false)} value={searchText} onInput={setSearchText} onClick={toSearch}></SearchBar>  
                    </React.Fragment>
                }
                </section>
            </div> 
        </header> 
    )
}

export default PrimaryHeader
