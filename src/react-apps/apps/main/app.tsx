import React, { useEffect, useRef } from "react";
import './style.css'
import Routes from './routes' 
import { DialogStack }  from 'fck-react-dialog'
import { useSelector } from "react-redux";

export const GlobalContext = React.createContext<any>({});

export const App = () =>{
    const appRef = useRef<HTMLHeadingElement>(null)

    const { loading } = useSelector((state:any)=>state.main)

    const [ StackComponent, StackState ] = DialogStack();

    return (
        <GlobalContext.Provider value={{ dialog: StackState, app: appRef }}>
            <div id="App" ref={appRef} className={`${loading ? "app-is-loading" : ""}`} > 
                <Routes></Routes> 
                <StackComponent></StackComponent> 
            </div>
        </GlobalContext.Provider>
    )
}

export default App