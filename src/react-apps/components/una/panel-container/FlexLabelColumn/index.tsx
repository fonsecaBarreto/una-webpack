import React from 'react'
import './style.css'

export namespace FlexLabelColumn {
    export type Params = {
        children: React.ReactNode, 
        label:string
    }
}

export const FlexLabelColumn: React.FunctionComponent<FlexLabelColumn.Params> = ({label, children}) =>{
     return (
          <div className="flex-label-column">
               <span>{label}:</span> 
               <span>{children}</span>
          </div>
     )
}

export default FlexLabelColumn