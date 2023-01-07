import * as React from 'react';
import './style.css'
import SearchBox from "./components/Headline"
import Perks from "./components/Perks"
import SignUpCall from './components/SignUpCall';
import VideoContainer from './components/VideoContainer';
import { Link } from 'react-router-dom';
export const HomePage = () => {
    return (
        <div id="landing-page">
            <div className="bl-bg-container">
                <Link to="/home">home</Link>
                <SearchBox/>
                <Perks></Perks>
            </div>
            <SignUpCall></SignUpCall>
            <VideoContainer></VideoContainer>
        </div> 
    )
}


export default HomePage;