import React, { useRef } from "react";
import '../app.css'
import Routes from './routes' 

export const App = () =>{
    const appRef = useRef<HTMLHeadingElement>(null)
    return (
        <div id="App" ref={appRef} > 
            <Routes></Routes> 
        </div>
    )
}

export default App