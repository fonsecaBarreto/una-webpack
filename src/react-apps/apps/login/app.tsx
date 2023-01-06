import React, { useEffect, useRef } from "react";
import SigninPage from "./pages/login/sign-in";
import "../app.css"
export const App = () =>{
    const appRef = useRef<HTMLHeadingElement>(null)
    return (
        <div id="App" ref={appRef} >
            <SigninPage/>
        </div>
    )
}

export default App