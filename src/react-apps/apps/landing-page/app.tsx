import React, { useRef } from "react";
import './style.css'
import LandingPage from "./components";
import Footer from '@/react-apps/layouts/BlueLagum/Footer'
import Header from './components/Header'

export const MyApplication = () =>{

    return (
        <div id="App"  > 
          <div id="landing-page">
            <Header></Header>
            <LandingPage></LandingPage>
            <Footer></Footer>
          </div>
        </div>
    )
}
export default MyApplication