import "regenerator-runtime/runtime";
import "core-js/stable"; 
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from '../../reportWebVitals';
import App from './app'

import {  BrowserRouter } from "react-router-dom"

ReactDOM.hydrate( 
    <React.StrictMode>    
        <BrowserRouter>
            <App />  
        </BrowserRouter>  
    </React.StrictMode>
, document.getElementById("root") );
reportWebVitals(); 

