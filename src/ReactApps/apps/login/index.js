import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from '../../reportWebVitals';
import App from './app'
ReactDOM.render(
    <React.StrictMode>
        <div>
            Aqui é o main app da coisa
            <a href="/"> Vá para o app</a>
            <App></App>
        </div>
    </React.StrictMode>, document.getElementById("root") );
reportWebVitals(); 

