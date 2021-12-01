import React from "react";
import ReactDOM from "react-dom";

/* scripts */
import "core-js/stable";
import "regenerator-runtime/runtime";

import { Provider } from 'react-redux'
import store from '../../store'
import App from './main/app';

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>, document.getElementById("root") );
