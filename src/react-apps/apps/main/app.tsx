import React from "react";
import Routes from './routes'
import './style.css'
import { DialogStack }  from 'fck-react-dialog'
import MyContext from './global/global-components-context';

export const MyApplication = () =>{
    const [ StackComponent, StackState ] = DialogStack();
    return (
        <MyContext.Provider value={{ dialog: StackState}}>
            <React.Fragment>
                <div id="App">
                    <Routes></Routes>
                    <StackComponent></StackComponent> 
                </div>
            </React.Fragment>
        </MyContext.Provider>
    )
}
export default MyApplication