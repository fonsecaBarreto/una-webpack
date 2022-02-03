import React from 'react'
import "./style.css"

export const PanelContainer: React.FunctionComponent<any> = ({children, title, icon}) =>{
    return (
        <div className='una-panel-container'>
            <header> 
                {icon}
                <span>  {title} </span>
            </header>
            <section>   
                {children}
            </section>
        </div>
    )
}

export default PanelContainer