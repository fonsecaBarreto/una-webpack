import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from '../../../reportWebVitals';
import { Provider } from 'react-redux'

import "core-js/stable";
import "regenerator-runtime/runtime";

import { Store } from "../../global";

import App from './app'

ReactDOM.render(
    <Provider store={Store}>
        <React.StrictMode>
            <App></App> 
        </React.StrictMode>
    </Provider>, document.getElementById("root") );
reportWebVitals();


console.log("testin it")
const person: any = {}

person.speak();