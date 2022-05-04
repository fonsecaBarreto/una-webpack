
import React, { useContext, useState } from 'react'
import './style.css'
import ToggleButton from "../../components/ToggleButton"
import LogoImg from '@/public/assets/images/logo.svg' 
import SearchBar from '../../components/SearchBar'
import OptionsNav from './OptionsNav'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useWindowSize } from 'fck-components/lib/utils/hooks'
import qs from 'query-string';
import { useEffect } from 'react'

export namespace PrimaryHeader {
    export type Params = {
        user: any
        toggleCart: () => void,
        menuState: { show: boolean, toggle: Function }
    }
}

export const PrimaryHeader: React.FunctionComponent<PrimaryHeader.Params> =  ({ user, toggleCart, menuState })=> {
    const history = useHistory();
    const location = useLocation()
    const [ searchText, setSearchText ] = useState("")
    const { width } = useWindowSize()
    const [ showSearchBar, setShowSearchBar ] = useState(false);

    const toSearch =() => { 
        const queryParams = qs.parse(location.search);
        const newQueries = { ...queryParams, v: searchText};
        history.push({ search: qs.stringify(newQueries) });
    }
    
    useEffect(()=>{ if(width >960){ setShowSearchBar(false)} },[width])

    return (
        <header className="primary-header">
            <div className="primary-header-content app-container">

                <section>
                    <ToggleButton onClick={menuState.toggle}></ToggleButton>
                    <Link to="/" className="bluelagum-logo-link desktop-only">
                        <img src={LogoImg}/>  
                    </Link>
                </section>

                <section>
                {(!showSearchBar) ?
                    <React.Fragment>
                        <SearchBar className='desktop-only' value={searchText} onInput={setSearchText} onClick={toSearch}></SearchBar>
                        <OptionsNav toggleCart={toggleCart} toggleSearch={()=>setShowSearchBar(true)}></OptionsNav>
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
