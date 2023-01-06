import React, { useEffect, useRef } from "react";
import Home from './pages/Home'
import "../app.css"
export const App = () =>{
    const appRef = useRef<HTMLHeadingElement>(null)
    return (
        <div id="App" ref={appRef} >
            <Home/>
        </div>
    )
}

export default App