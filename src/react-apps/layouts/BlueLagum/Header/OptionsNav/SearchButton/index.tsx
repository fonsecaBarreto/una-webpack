import React, { useState } from 'react'
import './style.css'
import { FaSearch } from 'react-icons/fa'

export const SearchButton: React.FunctionComponent<any> = ({ onClick, onHover, className="" }) =>{
    return (
        <React.Fragment>
            <button className={`header-search-button ${className}`} onClick={onClick} onMouseEnter={onHover} >
                <FaSearch></FaSearch>
            </button>
        </React.Fragment>
    )
}

export default SearchButton