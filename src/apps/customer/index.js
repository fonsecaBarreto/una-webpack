import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux'
import store from '../../store'
import App from './app';

ReactDOM.render(
    <div>
        Sister and brothers
        <App />
   {/*  <Provider store={store}>
        <React.StrictMode>
          
        </React.StrictMode>
    </Provider> */}
    </div>
    
    , document.getElementById("root") );
