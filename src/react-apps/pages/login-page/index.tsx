
import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import './style.css' // Baixar em um arquivo separado
import LoginContent from '@pages/login-page/content';

export const LoginPage: React.FunctionComponent<any> = (props) =>{

    return (
        <div id="login-screen">   
            <LoginContent/>
        </div>
    )
}

export default LoginPage