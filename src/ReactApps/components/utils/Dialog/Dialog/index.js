import React from 'react'
import './style.css'
import { FaTimes } from 'react-icons/fa'
export * from "./presentation"

export const MakeDialogConfig = ( content, onAction, title="...", icon=null, loading =false) => {
    return (  { content, onAction, title, icon, loading } )
}

export function Dialog({ config, index=0, show= true }){

    const { content: Content, title, icon, loading, onAction } = config
    return (
        <React.Fragment>
        { !show? undefined
            :<div className={"app-dialog"}>

                <div className="app-dialog-content" style={{ marginTop: 64 + (index)*16 }}>

                    <div className="app-dialog-header">
                       { icon && <span> {icon}</span>}
                       { title && <span>{title}</span>}
                        <button onClick={() => onAction(-1)} className="adc-close"> 
                            <FaTimes> </FaTimes>
                        </button>
                    </div>

                    <div className={`app-dialog-body ${loading ?' div-loading' : ''}`}>
                        <Content onAction={onAction}></Content>
                    </div> 
                </div>
            </div>
            }
        </React.Fragment>
    )
}

export default Dialog