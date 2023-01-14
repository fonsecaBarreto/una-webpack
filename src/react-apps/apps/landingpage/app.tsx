import React, { useEffect, useRef } from "react";
import Home from './pages/Home'
import "../app.css"
import { Router, BrowserRouter, Switch, Route, Link } from "react-router-dom"


export const Test = () =>{
    return (
        <div>
            
        </div>
    )
}
export const App = () =>{
    const appRef = useRef<HTMLHeadingElement>(null)
    return (
        <div id="App" ref={appRef} >
            <Switch>    
                <Route path="/bem-vindo/sobre">
                    <Test/>
                </Route>
                <Route path="/bem-vindo">
                    <Home />
                </Route>
            </Switch>
        </div>
    )
}

export default App