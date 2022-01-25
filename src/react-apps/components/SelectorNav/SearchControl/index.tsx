import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import Wrapper, { SelectorNavWrapper } from '../Wrapper'
import { AiOutlineSearch } from 'react-icons/ai'
export namespace SearchControl {
    export interface Params extends Omit<SelectorNavWrapper.Params, 'children'> {
        onClick: (text: string) =>void
    }
}   

export const SearchControl: React.FunctionComponent<SearchControl.Params> =  ({ title, onClick }) =>{

    const [ text, setText ] = useState("");

    const handleClick = () =>{
        onClick(text)
    }

    return (
        <Wrapper title={title}>
            <section className='search-control'>
                <input type="text" value={text} onInput={ ( e:ChangeEvent<HTMLInputElement> ) => setText(e.target.value) }></input>
                <button className="una-submit-button-color" onClick={handleClick}> <AiOutlineSearch/></button>
            </section>
        </Wrapper>
    )
}

export default SearchControl
