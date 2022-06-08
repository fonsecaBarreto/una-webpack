
import React, { useEffect, useMemo, useState } from 'react'
import './style.css'
import SearchIcon from "./search.svg"

export namespace SearchBar {
    export type Params = {
        entry: string,
        onChange: (k: string, payload?: any) => void
    }
}
export const SearchBar: React.FunctionComponent<SearchBar.Params> = ({ entry, onChange})  =>{
    const [ value, setValue ] = useState("")

    useEffect(()=>{ 
        console.log('nova entrada', entry)
        setValue(entry ?? "")
    },[entry])

    const handleKeys = (e:any) =>{
        if(e.key === "Enter") return onChange('SUBMIT', value)
    } 
    return (
        
        <div className={`alt-pool-searchinput `}>
            {/* <span>
                <button className='alt-pool-searchinput-cancel' onClick={()=>onChange('CANCEL')}> &#10005;</button>
            </span> */}
            <input type="text" 
                placeholder="Pesquisa"
                value={value} 
                onInput={(e:any) => setValue(e.target.value)} 
                onKeyDown={handleKeys}>
            </input>
            <button onClick={()=>onChange('SUBMIT', value)} className='alt-pool-searchinput-submit'>
                <img src={SearchIcon}></img>    
            </button> 
        </div>
    )
}

export default SearchBar
