import * as React from 'react';
import "./style.css"

export const FloatAsideContent:React.FunctionComponent<any> = ({children, show = false}) =>{
    return (
        <div className={`bl-float-aside-overflow ${show ? "show" :""}`}>
            <div className={`bl-float-aside-content `}>
                {children}
            </div>
        </div>
    )
}
export default FloatAsideContent