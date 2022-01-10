import React, { ReactNode, useContext, useEffect } from "react";
import Routes from './routes'
import './style.css'
import { DialogStack, MakeNotification, NotificationType }  from 'fck-react-dialog'
import MyContext from './global/global-components-context';


export const MyApplication = () =>{
    const [ StackComponent, StackState ] = DialogStack();
    return (
        <MyContext.Provider value={{ dialog: StackState}}>
            <React.Fragment>
                <Routes></Routes>
                <StackComponent></StackComponent> 
            </React.Fragment>
        </MyContext.Provider>
    )
}

export default MyApplication