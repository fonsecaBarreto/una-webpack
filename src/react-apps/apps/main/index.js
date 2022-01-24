import "regenerator-runtime/runtime";
import "core-js/stable"; 
import '@/public/root.css'
import '@/public/una.css'
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from '../../reportWebVitals';
import App from './app'
import store from '@/react-apps/store'
import { Provider } from 'react-redux'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App></App>
        </Provider>
    </React.StrictMode> ,document.getElementById("root") );
reportWebVitals(); 

