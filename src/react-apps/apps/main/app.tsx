import React, { useRef } from "react";
import Routes from './routes'
import './style.css'
import { DialogStack }  from 'fck-react-dialog'
import MyContext from './global-components-context';
import { useSelector } from "react-redux";

export const MyApplication = () =>{
    const { loading } = useSelector((state:any)=>state.main)
    const [ StackComponent, StackState ] = DialogStack();
    const appRef = useRef<HTMLHeadingElement>(null)
    return (
        <MyContext.Provider value={{ dialog: StackState, app: appRef }}>
            <div id="App" ref={appRef} className={`${loading ? "app-is-loading" : ""}`} > 
                <Routes></Routes> 
                <StackComponent></StackComponent>
            </div>
        </MyContext.Provider>
    )
}
export default MyApplication