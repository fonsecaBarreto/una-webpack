import React, { Children, FC, ReactNode, useEffect, useState } from 'react'
import './style.css'
import { RiCloseFill } from "react-icons/ri"

export namespace BlueLagumAsideModal {
    export type Params = {
        loading: boolean,
        title:string
        show: boolean,
        onClose: () => void,
        content: ReactNode,
        footer: ReactNode,
        dir?: "left" | "right",
        className?: string
    }
}

export const BlueLagumAsideModal: React.FunctionComponent<BlueLagumAsideModal.Params> = ({ show, loading, onClose, content, footer, title, dir="right", className }) =>{
    return (
        <React.Fragment>
           { show && <div className={`bl-aside-modal-overflow ${className} ${loading ? "bl-aside-loading" : ""}`} 
                style={{ justifyContent: dir == "right" ? "flex-end" : "flex-start"  }}>

                <div className="bl-aside-modal">

                    <header>
                        <button className='bl-close-btn' onClick={onClose}> <RiCloseFill></RiCloseFill>  </button> 
                        <span> {title}</span>
                    </header>

                    <div className="bl-aside-modal-body">
                       {content}
                    </div>

                    <footer>
                       {footer}
                    </footer>
                </div>
            </div>}
        </React.Fragment>
    )
}


export default BlueLagumAsideModal