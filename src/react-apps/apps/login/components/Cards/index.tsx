import React from 'react'
import './style.css'

export namespace LoginCard {
    export type Params = {
        children: React.ReactNode, 
        show: boolean, 
        title: string, 
        className?: string, 
        loading?: boolean,
        sm?: boolean
    }
}

export const LoginCard: React.FunctionComponent<LoginCard.Params> = ({ children, show, title, className, loading, sm }): JSX.Element =>{
    return (
        <div className={`login-card ${sm? "sm": ""} ${show ? 'show': '' } ${loading ? 'card-loading' : ''} ${className} 'card-loading `}>
       
            <div className="login-card-header">
                <span className="login-header-text"> {title} </span>
            </div>

            <section className="login-card-content">
                {children} 
                <span className="cp-small-span">Copyright©2022, UnaCompras. Todos os direitos reservados.</span> 
            </section> 
        </div>
    )
}


export default LoginCard
