import React from 'react'
import { BiExit } from 'react-icons/bi'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import "./style.css"


export const GodModeNotify:React.FunctionComponent<any> = ({show, exit}) => {
    return (
    <div className={`blue-lagum-notify ${show ? "toShow" : ""}`}>
        <section>
            <MdOutlineAdminPanelSettings/>
        </section> 

        <section>
            <span> Você está em modo Administrador  </span>
            <span> Saia se não tiver certeza</span>
        </section>

        <section>
            <button onClick={exit}> <BiExit/> </button>
        </section>
        
    </div>
    )
}


export default GodModeNotify