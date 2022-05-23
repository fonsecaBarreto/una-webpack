
import React, { useState } from 'react'
import './style.css'
import SearchIcon from "./search.svg"

export namespace SearchBar {
    export type Params = {
        value: string,
        onChange: (k: string, payload?: any) => void
    }
}
export const SearchBar: React.FunctionComponent<SearchBar.Params> = ({ value, onChange})  =>{

    const search = () => {
        onChange('SUBMIT')
       // state.loadFeed(0, false)
    }

    const handleKeys = (e:any) =>{
        if(e.key === "Enter") return search()
    } 

    return (
        
        <div className={`alt-pool-searchinput `}>
            {/* <span>
                <button className='alt-pool-searchinput-cancel' onClick={()=>onChange('CANCEL')}> &#10005;</button>
            </span> */}
            <input type="text" 
                placeholder="Pesquise"
                value={value} 
                onInput={(e:any) => onChange('INPUT', e.target.value)} 
                onKeyDown={handleKeys}>
            </input>
            <button onClick={search} className='alt-pool-searchinput-submit'>
                <img src={SearchIcon}></img>    
            </button> 
        </div>
    )
}

export default SearchBar
