import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from './reportWebVitals';
/* dep */
import "core-js/stable";
import "regenerator-runtime/runtime";
/* Folhas de Estilo Padrão */
import "./assets/styles/root.css";
import "./assets/styles/fonts.css";
/* Redux */
import { Provider } from 'react-redux'
import store from "./store"
/* Dom Render */
export const defaultRender = ({ app: App}) =>{
    ReactDOM.render(
        <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>, document.getElementById("root") );
    reportWebVitals();
}

export default defaultRender

export * as Store from './store'

export { AppRouter } from './router'

export *  from './Implementations' 



