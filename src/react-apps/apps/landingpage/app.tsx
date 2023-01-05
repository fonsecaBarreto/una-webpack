import React, { useRef } from "react";
import '../app.css'

export const App = () =>{
    const appRef = useRef<HTMLHeadingElement>(null)
    return (
        <div id="App" ref={appRef} > 
            Testes
        </div>
    )
}

export default App