import "regenerator-runtime/runtime";
import "core-js/stable"; 
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from '../../reportWebVitals';
import App from './app'

ReactDOM.hydrate( <App></App>, document.getElementById("root") );
reportWebVitals(); 

