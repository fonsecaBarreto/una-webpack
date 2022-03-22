
import React, { useContext, useState } from 'react'
import './style.css'
import ToggleButton from "../../components/ToggleButton"
import LogoImg from '@/public/assets/images/logo-alt-dark.png' 
import SearchBar from '../SearchBar'
import OptionsNav from './OptionsNav'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useWindowSize } from 'fck-components/lib/utils/hooks'
import qs from 'query-string';

export namespace PrimaryHeader {
    export type Params = {
        toggleCart: () => void,
        menuState: { show: boolean, toggle: Function }
    }
}


export const PrimaryHeader: React.FunctionComponent<PrimaryHeader.Params> =  ({ toggleCart, menuState })=> {
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

    return (
        <header className="primary-header">
            <div className="primary-header-content app-container">

                <section>
                    <ToggleButton onClick={menuState.toggle}></ToggleButton>
                    {
                        (width > 960) && (
                        <Link to="/" className="bluelagum-logo-link">
                            <img src={LogoImg}></img>  
                        </Link>)
                    }
                </section>

                <section>
                    <SearchBar value={searchText} onInput={setSearchText} onClick={toSearch}></SearchBar>  
                    <OptionsNav toggleCart={toggleCart} toggleSearch={()=>setShowSearchBar(true)}></OptionsNav>
                </section>
            </div> 
        </header> 
    )
}

export default PrimaryHeader
