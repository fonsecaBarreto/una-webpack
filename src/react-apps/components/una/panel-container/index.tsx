import React, { ReactNode } from 'react'
import "./style.css"

export namespace PanelContainer {
    export type Params= {
        children: ReactNode,
        title: string, 
        icon: ReactNode,
        headerContent?: ReactNode
    }
}
export const PanelContainer: React.FunctionComponent<PanelContainer.Params> = ({children, title, icon, headerContent}) =>{
    return (
        <div className='una-panel-container'>
            <header> 
                {icon}
                <span>  {title} </span>
                { headerContent && 
                    <section className='header-side-content'>
                        {headerContent}
                    </section>
                }
            </header>
            <section>   
                {children}
            </section>
        </div>
    )
}

export default PanelContainer