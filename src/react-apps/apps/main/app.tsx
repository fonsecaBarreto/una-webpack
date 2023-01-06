import React, { useRef } from "react";
import '../app.css'
import Routes from './routes' 
import { useSelector } from "react-redux";
import { GlobalContext } from "../GlobalContext";
import FixedUnaLoading from "@/react-apps/layouts/components/FixedLoading";
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux' 
import WhatsAppFloatButton from "@/react-apps/components/WhatsAppButton";
import store from '@/react-apps/store/index.js'

export const App = () =>{
    const appRef = useRef<HTMLHeadingElement>(null)
   
    return (
        <Provider store={store}>
            <GlobalContext.Provider value={{ app: appRef }}>
                <div id="App" ref={appRef} className={`${false ? "app-is-loading" : ""}`} > 
                   <LoadingContent/>
                    <Routes></Routes> 
                    <ToastContainer/>  
                    <WhatsAppFloatButton/>
                </div>
            </GlobalContext.Provider>
        </Provider>
    )
}

export const LoadingContent = () =>{
    const { loading } = useSelector((state:any)=>state.main)
   
    return (  <>
            { loading && <FixedUnaLoading> </FixedUnaLoading>}
        </>
    )
}

export default App