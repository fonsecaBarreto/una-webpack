import React, { useEffect, useState } from 'react'
import './style.css'
import SearchIcon from "@assets/icons/search.svg"
import SearchBar from '@/react-apps/layouts/components/SearchBar'
import UseWindowSize from '@/react-apps/components/utils/UseWindowSize'
import qs from 'query-string';
import { useHistory, useLocation } from 'react-router-dom'

export const SearchButton: React.FunctionComponent<any> = ({ onClick, onHover }) =>{

    const history = useHistory();
    const location = useLocation()
    const [ showSearchBar, setShowSearchBar ] = useState(false);
    const { width } = UseWindowSize();
    const [ searchText, setSearchText ] = useState("")

    const toSearch =() => { 
        const queryParams = qs.parse(location.search);
        const newQueries = { ...queryParams, v: searchText, p: 1};
        history.push({ pathname:"/mercado",search: qs.stringify(newQueries) });
    }
    useEffect(()=>{ if(width >960){ setShowSearchBar(false)} },[width])

    return (
        <div className={`search-container ${showSearchBar ? "fill-up" :""}`}>
            {
                (!showSearchBar) ?
                    <button className={`header-search-button `} onClick={()=>setShowSearchBar(true)} onMouseEnter={onHover} >
                        <img src={SearchIcon}></img>    
                    </button> 
                    :
                    <>
                        <SearchBar 
                            value={searchText} 
                            onClick={toSearch}
                            onInput={setSearchText} 
                            onCancel={()=>setShowSearchBar(false)}/> 
                    </>
           
            }
        </div>
    )
}

export default SearchButton