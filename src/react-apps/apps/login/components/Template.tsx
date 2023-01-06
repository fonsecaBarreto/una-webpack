
import React from "react"
import './styles.css'
import LogoImg from '@/public/assets/images/logo.svg' 

export const LoginTemplateScreen: React.FunctionComponent<any> = ({ children, title, lead }) =>{

    return (

            <div id="login-screen">
                <header>
                    <span> <img src={LogoImg}/> </span>
                    <nav>
                        <a href="/">Votar</a>
                    </nav>
                </header>
                <main>

                    <div className="login-glass">

                        <h1 className="title"> { title} </h1>
                        <h5 className="lead"> {lead } </h5>
                        {children}
                    </div>
                </main>
            </div>

    )
}