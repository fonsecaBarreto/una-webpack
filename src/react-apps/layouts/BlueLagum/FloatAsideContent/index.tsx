import * as React from 'react';
import "./style.css"

export const FloatAsideContent:React.FunctionComponent<any> = ({children, show = false, anchor="left"}) =>{
    return (
        <div className={`bl-float-aside-overflow ${show ? "show" :""} ${anchor}`}>
            <div className={`bl-float-aside-content `}>
                {children}
            </div>
        </div>
    )
}
export default FloatAsideContent