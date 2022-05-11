import React, { Children, FC, ReactNode, useEffect, useState } from 'react'
import './style.css'

export namespace BlueLagumAsideModal {

    export interface LayoutParams {
        onClose: () => void,
        footer?: ReactNode,
        title:string
        loading: boolean
    }
    export interface Params extends LayoutParams{
        show: boolean,
        dir?: "left" | "right",
        className?: string,
        content: ReactNode,
    }
   
}


export const BlAsideLayout:React.FunctionComponent<BlueLagumAsideModal.LayoutParams> = ( { loading, children, footer, title, onClose }) =>{
    return (
        <div className={`bl-aside-modal ${loading ? 'bl-aside-loading' : ''}`}>
            <header>
                <button className='bl-close-btn' onClick={onClose}> &#10005; </button> 
                <span> {title}</span>
            </header>
            <div className="bl-aside-modal-body">
                {children}
            </div>
            <footer>
                { footer && footer}
            </footer>
        </div>
    )
}

export const BlueLagumAsideModal: React.FunctionComponent<BlueLagumAsideModal.Params> = ({ show, content, dir="right", className, ...rest }) =>{
    return (
        <React.Fragment>
           { show && <div className={`bl-aside-modal-overflow ${className}`} 
                style={{ justifyContent: dir == "right" ? "flex-end" : "flex-start"  }}>
                    <div className={`bl-aside-modal-content`}>
                        <BlAsideLayout { ...rest } >
                            {content}
                        </BlAsideLayout>
                    </div>
            </div>}
        </React.Fragment>
    )
}


export default BlueLagumAsideModal