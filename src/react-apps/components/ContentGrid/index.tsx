import React, { ReactNode  } from 'react'
import './style.css'
export namespace ContentGrid {

    export type Params = {
        children: ReactNode
    }

}
export const ContentGrid: React.FunctionComponent<ContentGrid.Params> = ({ children }) =>{
    return (
        <div id="departamento-content-grid">
            { React.Children.map(children, (x,i) =>(<section> {x} </section> ))}
        </div>
    )
}

export default ContentGrid