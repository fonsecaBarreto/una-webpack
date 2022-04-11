import React, { ReactNode } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import "./style.css"


export namespace PanelContainer {
    export type buttonsConfig = { content: ReactNode, onClick: any }
    export type Params= {
        children: ReactNode,
        title: string, 
        icon: ReactNode,
        headerButtons?: buttonsConfig[]
    }
}

export const PanelContainer: React.FunctionComponent<PanelContainer.Params> = ({ children, title, icon, headerButtons }) =>{
    return (
        <div className='una-panel-container'>
            <header> 
                <button> <MdKeyboardArrowDown/> </button>
                {icon} <span>  {title} </span>

                { 
                    headerButtons && 
                    <section className='header-side-content'>
                    {
                        headerButtons.map(({ content, onClick }, i)=>{
                            return (  <button onClick={onClick} key={i}> { content } </button>
                        )})
                    }
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