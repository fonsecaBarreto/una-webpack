import "regenerator-runtime/runtime";
import "core-js/stable"; 
import '@/public/root.css'
import '@/public/una.css'
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from '../../reportWebVitals';
import App from './app'

ReactDOM.render(
    <React.StrictMode>
            <App></App>
    </React.StrictMode>, document.getElementById("root") );
reportWebVitals(); 

