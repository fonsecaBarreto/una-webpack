import React, { useState } from 'react'
import './style.css'
import { FaSearch } from 'react-icons/fa'
import SearchBar from '../../../SearchBar'

export const SearchButton: React.FunctionComponent<any> = ({ onClick, onHover }) =>{
    return (
        <React.Fragment>
            <button className='header-search-button' onClick={onClick} onMouseEnter={onHover} >
                    <FaSearch></FaSearch>
            </button>
        </React.Fragment>
    )
}

export default SearchButton