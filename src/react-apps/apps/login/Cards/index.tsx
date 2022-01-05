import React from 'react'
import './style.css'

import Logo from '../../../../public/assets/images/logo.svg' 


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
        <div className={` login-card ${sm? "sm": ""} ${show ? 'show': '' } ${loading ? 'card-loading' : ''} ${className}  `}>
       
            <div className="login-card-header">

                <img src={Logo} className="login-logo" ></img>
            </div>

            <section className="login-card-content">
                <span className="login-header-text"> {title} </span>
                {children} 
                <span className="cp-small-span">Copyright©2022, UnaCompras. Todos os direitos reservados.</span> 
            </section> 
        </div>
    )
}


export default LoginCard
