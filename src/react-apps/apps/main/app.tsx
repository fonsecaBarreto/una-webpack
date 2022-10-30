import React, { useRef } from "react";
import '../app.css'
import Routes from './routes' 
import { DialogStack }  from 'fck-react-dialog'
import { useSelector } from "react-redux";
import { GlobalContext } from "../GlobalContext";
import FixedUnaLoading from "@/react-apps/layouts/components/FixedLoading";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const App = () =>{
    const appRef = useRef<HTMLHeadingElement>(null)
    const { loading } = useSelector((state:any)=>state.main)
    const [ StackComponent, StackState ] = DialogStack();
    return (
        <GlobalContext.Provider value={{ dialog: StackState, app: appRef }}>
            <div id="App" ref={appRef} className={`${loading ? "app-is-loading" : ""}`} > 
                { loading && <FixedUnaLoading> </FixedUnaLoading>}
                <Routes></Routes> 
                <ToastContainer/>
                <StackComponent></StackComponent> 
            </div>
        </GlobalContext.Provider>
    )
}

export default App