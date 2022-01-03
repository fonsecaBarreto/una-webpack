import React from 'react'
import './style.css'

import Logo from '../../../../public/assets/images/logo.svg' 
import UnaSubmitButton from '../../../components/una/SubmitButton'

export namespace LoginCard {
    export type Params = {
        children: React.ReactNode, 
        show: boolean, 
        title: string, 
        className?: string, 
        loading?: boolean,
        submitText: string
    }
}

export const LoginCard: React.FunctionComponent<LoginCard.Params> = ({ children, show, title, className, loading, submitText }): JSX.Element =>{
    return (
        <div className={`login-card ${show ? 'show': '' } ${className} ${loading ? 'card-loading' : ''} `}>
       
            <div className="login-card-header">

                <img src={Logo} className="login-logo" ></img>
            </div>

            <section className="login-card-content">
                <span className="login-header-text"> {title} </span>
                {children} 
                <span className="cp-small-span">Copyright©2021, UnaCompras. Todos os direitos reservados.</span> 
                <UnaSubmitButton></UnaSubmitButton>
                {/* <UnaSubmitButton > {submitText} </UnaSubmitButton> */}
            </section> 
        </div>
    )
}


export default LoginCard
