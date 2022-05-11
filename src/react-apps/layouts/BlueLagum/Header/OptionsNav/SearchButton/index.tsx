import React, { useState } from 'react'
import './style.css'
import SearchIcon from "@assets/icons/search.svg"
export const SearchButton: React.FunctionComponent<any> = ({ onClick, onHover, className="" }) =>{
    return (
        <React.Fragment>
            <button className={`header-search-button ${className}`} onClick={onClick} onMouseEnter={onHover} >
                <img src={SearchIcon}></img>    
            </button>
        </React.Fragment>
    )
}

export default SearchButton