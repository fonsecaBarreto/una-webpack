
import React, { useState } from 'react'
import './style.css'
import { HiSearchCircle } from 'react-icons/hi'

export const SearchBar: React.FunctionComponent<any> = ({})  =>{

    const handleInput = () => {
        console.log("Pesquisar")
        //state.setText(e.target.value)
    }

    const search = () => {
       // state.loadFeed(0, false)
    }

    const handleKeys = ( ) =>{
        console.log("digitando")
        //if(e.key === "Enter") return search()
    } 

    return (
        
        <div className="bl-searchbar-input">
        
            <input type="text" 
                placeholder="Pesquise por produto"
                value={""} 
                onInput={handleInput} 
                onKeyDown={handleKeys}></input>

            <button onClick={search}>
               <HiSearchCircle></HiSearchCircle>
            </button>
    
        </div>
    )
}

export default SearchBar
