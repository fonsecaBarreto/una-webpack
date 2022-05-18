import * as React from 'react';
import './style.css'
import SearchBox from "./components/Headline"
import Perks from "./components/Perks"
import SignUpCall from './components/SignUpCall';
export const HomePage = () => {
    return (
        <div id="landing-page">
            <div className="bl-bg-container">
                <SearchBox/>
                <Perks></Perks>
                <SignUpCall></SignUpCall>
            </div>
        </div> 
    )
}


export default HomePage;