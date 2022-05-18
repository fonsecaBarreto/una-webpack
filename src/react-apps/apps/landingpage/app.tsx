import React, { useRef } from "react";
import '../app.css'
import Routes from './routes' 

export const App = () =>{
    const appRef = useRef<HTMLHeadingElement>(null)
    return (
        <div id="App" ref={appRef} > 
            Olá sou a landing page
            <Routes></Routes> 
        </div>
    )
}

export default App