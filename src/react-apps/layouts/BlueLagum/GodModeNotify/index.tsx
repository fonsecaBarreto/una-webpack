import React from 'react'
import "./style.css"


export const GodModeNotify:React.FunctionComponent<any> = ({show, exit}) => {
    return (
    <div className={`blue-lagum-notify ${show ? "toShow" : ""}`}>
        <section>
       
        </section> 

        <section>
            <span> Você está em modo Administrador  </span>
            <span> Saia se não tiver certeza</span>
        </section>

        <section>
            <button onClick={exit}> Sair </button>
        </section>
        
    </div>
    )
}


export default GodModeNotify