import * as React from 'react';
import './style.css'

import VideoContainer from "./VideosContainer"
export const HomePage = () => {
    return (
        <div id="home-page">
            Eu sou o home page aqui
            <VideoContainer></VideoContainer>
        </div> 
    )
}


export default HomePage;