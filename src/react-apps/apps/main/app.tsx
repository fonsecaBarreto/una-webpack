import React, { useEffect, useRef } from "react";
import "../app.css";
import Routes from "./routes"; 
import { Provider, useSelector } from "react-redux";

import FixedUnaLoading from "@/react-apps/layouts/components/FixedLoading";
 import { ToastContainer } from 'react-toastify';
import WhatsAppFloatButton from "@/react-apps/components/WhatsAppButton";

import store from "@/react-apps/store/index.js";
import { Link, Route, Switch } from "react-router-dom";
import MartPage from "@/react-apps/pages/mart-page";
import Cotacao from "@/react-apps/pages/cotacoes/[budget_id]";
import GlobalContext from "../GlobalContext";

export const App = (props: any) => {
  const appRef = useRef<HTMLHeadingElement>(null);
  return (
    <Provider store={store}>
      <GlobalContext.Provider value={{ app: appRef }}>
        <div
          id="App"
          ref={appRef}
          className={`${false ? "app-is-loading" : ""}`}
        >
           <Routes></Routes> 
            <WhatsAppFloatButton/>
            <ToastContainer/>  
            <LoadingContent/> 
        </div>
      </GlobalContext.Provider>
    </Provider>
  );
};

export const LoadingContent = () => {
  const { loading } = useSelector((state: any) => state.main);

  return <>{loading && <FixedUnaLoading> </FixedUnaLoading>}</>;
};

export default App;
