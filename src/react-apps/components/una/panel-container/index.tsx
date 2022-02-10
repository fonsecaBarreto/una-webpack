import React, { FunctionComponent, ReactNode, useContext } from 'react'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import "./style.css"
import { MakeDialogConfig } from 'fck-react-dialog'



export namespace HeaderSideContent { 
    export type Params = {
        buttons: { content: ReactNode, view: ReactNode }[]
    }
}

const HeaderSideContent: React.FunctionComponent<HeaderSideContent.Params> = ({buttons}) =>{
    const context = useContext(GlobalContext)
    const openModal = (View: any) =>{
        return context.dialog.push(MakeDialogConfig(View, () =>{}, "!"))
    }
    return (
        <section className='header-side-content'>

            {
                buttons.map(({ content, view})=>{
                    return ( 
                        <button onClick={() => openModal(view)}>
                            { content }
                        </button>
                    )
                })
            }
        </section>
    )
}


export namespace PanelContainer {
    export type Params= {
        children: ReactNode,
        title: string, 
        icon: ReactNode,
        headerButtons?:  { content: ReactNode, view: ReactNode }[]
    }
}

export const PanelContainer: React.FunctionComponent<PanelContainer.Params> = ({children, title, icon, headerButtons}) =>{
    return (
        <div className='una-panel-container'>
            <header> 
                {icon}
                <span>  {title} </span>
                { headerButtons && 
                    <HeaderSideContent buttons={headerButtons}></HeaderSideContent>
                }
            </header>
            <section>   
                {children}
            </section>
        </div>
    )
}

export default PanelContainer