import React, { useEffect, useRef } from "react";
import Home from './pages/Home'
import "../app.css"
import { Router, BrowserRouter, Switch, Route, Link } from "react-router-dom"


export const Test = () =>{
    return (
        <div>
            Eu sou a pgina test
        </div>
    )
}
export const App = () =>{
    const appRef = useRef<HTMLHeadingElement>(null)
    return (
        <div id="App" ref={appRef} >
            <div>
                <Link to="/bem-vindo/about"> About</Link>
                <Link to="/bem-vindo/"> Home</Link>
            </div>
            <Switch>    
                <Route path="/bem-vindo/about">
                    <Test/>
                </Route>
                <Route path="/bem-vindo/users">
                    <Home/>
                </Route>
                <Route path="/bem-vindo">
                    <Home />
                </Route>
            </Switch>

    
        </div>
    )
}

export default App