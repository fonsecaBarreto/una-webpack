import React, { useRef } from "react";
import Routes from './routes'
import './style.css'
import { DialogStack }  from 'fck-react-dialog'
import MyContext from './global/global-components-context';

export const MyApplication = () =>{
    const [ StackComponent, StackState ] = DialogStack();
    const appRef = useRef<HTMLHeadingElement>(null)

    return (
        <MyContext.Provider value={{ dialog: StackState, app: appRef }}>
            <div id="App" ref={appRef} > 
                <Routes></Routes> 
                <StackComponent></StackComponent>  
            </div>
        </MyContext.Provider>
    )
}
export default MyApplication