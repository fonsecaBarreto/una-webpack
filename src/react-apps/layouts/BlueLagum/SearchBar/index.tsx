
import React, { useState } from 'react'
import './style.css'
import { HiSearchCircle } from 'react-icons/hi'

export namespace SearchBar {
    export type Params = {
        value: string,
        onInput: (v: string) => void,
        onClick: () => void
    }
}
export const SearchBar: React.FunctionComponent<SearchBar.Params> = ({value, onInput, onClick})  =>{

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
        
        <div className="bl-searchbar-input">
            <input type="text" 
                placeholder="Pesquise"
                value={value} 
                onInput={handleInput} 
                onKeyDown={handleKeys}>
            </input>
        </div>
    )
}

export default SearchBar
