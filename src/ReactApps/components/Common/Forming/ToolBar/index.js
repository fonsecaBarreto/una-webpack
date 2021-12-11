import React from 'react'
import './style.css'

export const CommonToolBar = ({children}) =>{
     return (
          <div className="form-tool-bar">
               {children}
          </div>
     )
}

export default CommonToolBar