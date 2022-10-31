
import React, { useState } from 'react'
import './style.css'
import SearchIcon from "@assets/icons/search.svg"

export namespace SearchBar {
    export type Params = {
        value: string,
        onInput: (v: string) => void,
        onClick: () => void,
        onCancel?: () => void,
        className?: string
    }
}
export const SearchBar: React.FunctionComponent<SearchBar.Params> = ({ className="", value, onInput, onClick, onCancel})  =>{

    const handleInput = (e: any) => {
        onInput(e.target.value)
    }

    const search = () => {
        onClick()
       // state.loadFeed(0, false)
    }

    const handleKeys = (e:any) =>{
        if(e.key === "Enter") return search()
    } 

    return (
        
        <div className={`bl-searchbar-input ${className}`}>
            <button onClick={search} className='bl-search-button'>
                <img src={SearchIcon}></img>    
            </button> 
            <input type="text" 
                placeholder="Pesquise"
                value={value} 
                onInput={handleInput} 
                onKeyDown={handleKeys}>
            </input>

            <span>
                <button className='bl-search-cancel' onClick={()=>onCancel && onCancel()}> &#10005;</button>
            </span>
         
        </div>
    )
}

export default SearchBar
