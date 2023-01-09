import "regenerator-runtime/runtime";
import "core-js/stable"; 
import "reflect-metadata"
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from '../../reportWebVitals';
import App from './app'
import { BrowserRouter } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.hydrate(
  <React.StrictMode>
    <BrowserRouter>
      <App data={window.__INITIAL_DATA__} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals(); 

