import "regenerator-runtime/runtime";
import "core-js/stable"; 
import '../../../public/root.css'
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from '../../reportWebVitals';
import App from './app'
import store from '@/react-apps/store'
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
                <App></App>
        </React.StrictMode>
    </Provider>, document.getElementById("root") );
reportWebVitals(); 

