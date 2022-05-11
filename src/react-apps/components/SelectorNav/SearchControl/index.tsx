import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import Wrapper, { SelectorNavWrapper } from '../Wrapper'

export namespace SearchControl {
    export interface Params extends Omit<SelectorNavWrapper.Params, 'children'> {
        initial_value?: string;
        onClick: (text: string) =>void,
    }
}   

export const SearchControl: React.FunctionComponent<SearchControl.Params> =  ({ title, onClick, initial_value="" }) =>{

    const [ text, setText ] = useState(initial_value);

    useEffect(()=>{
        console.log("Search control foi instanciado")
    },[])
    const handleClick = () =>{
        onClick(text)
    }

    const handleKeys = (e:any) =>{
        if(e.key === "Enter") return onClick(text)
    } 

    return (
        <Wrapper title={title} showCurtain={false}>
            <section className='search-control'>
                <input type="text" value={text} onKeyDown={handleKeys} onInput={ ( e:ChangeEvent<HTMLInputElement> ) => setText(e.target.value) }></input>
                <button className="una-submit-button-color" onClick={handleClick}> pesquisa </button>
            </section>
        </Wrapper>
    )
}

export default SearchControl
