import React, { useEffect, useRef, useState } from "react"
import './style.css'
import PerksRow from "./PerksRow"
import HeadLine from "./HeadLine"

import VideosContainer from "./VideosContainer"
import Sobre from './BecomeMember'
export const LandingPage = () =>{

    const inicio = useRef(null)
    const cadastro = useRef(null)
    const goals = useRef(null)
    const sobre = useRef(null)

    return (
        <div id="home-page">

             <div ref={inicio} id="home">
                <HeadLine></HeadLine>
            </div>

            <div id="video">
                <VideosContainer></VideosContainer>
            </div>

            <div>
                <Sobre></Sobre>
            </div>
            
            <div ref={goals} id="goals">
                <div className="app-container">
                    <PerksRow></PerksRow> 
                </div> 
            </div> 

        </div>
    )
}

export default LandingPage