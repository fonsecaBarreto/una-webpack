import '../../../public/root.css'
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from '../../reportWebVitals';
import App from './app'

ReactDOM.render(
    <React.StrictMode>
        <div>
            <App></App>
        </div>
    </React.StrictMode>, document.getElementById("root") );
reportWebVitals(); 

