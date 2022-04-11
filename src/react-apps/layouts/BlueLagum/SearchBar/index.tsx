
import React, { useState } from 'react'
import './style.css'
import { HiSearchCircle } from 'react-icons/hi'
import { FaRegTimesCircle, FaTimes } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'

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
            <button className='bl-search-cancel mobile-only' onClick={()=>onCancel && onCancel()}> <GrClose/></button>
            <input type="text" 
                placeholder="Pesquise"
                value={value} 
                onInput={handleInput} 
                onKeyDown={handleKeys}>
            </input>
            <button className='bl-search-button'><FiSearch/></button> 
        </div>
    )
}

export default SearchBar
