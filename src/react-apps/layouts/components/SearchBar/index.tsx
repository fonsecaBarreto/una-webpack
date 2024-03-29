
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
        showCancel?: boolean
    }
}
export const SearchBar: React.FunctionComponent<SearchBar.Params> = ({ className="", value, onInput, onClick, onCancel, showCancel =true})  =>{

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

            {
                showCancel &&
                <span>
                    <button className='bl-search-cancel' onClick={()=>onCancel && onCancel()}> &#10005;</button>
                </span>
            }
    
            <input type="text" 
                placeholder="Pesquise"
                value={value} 
                onInput={handleInput} 
                onKeyDown={handleKeys}>
            </input>
           
            <button onClick={search} className='bl-search-button'>
                <img src={SearchIcon}></img>    
            </button> 
        </div>
    )
}

export default SearchBar
