
import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import './style.css' // Baixar em um arquivo separado
const LoginContent = lazy(() => import('@pages/login-page/content'));

export const LoginPage: React.FunctionComponent<any> = (props) =>{


    const [ isClient, setIsClient ] = useState(false)

    useEffect(()=>{
        setIsClient(true);
    },[])

    if(!isClient) return <></>
    return (
        <div id="login-screen">   
            <Suspense fallback={<div></div>}>    
                <LoginContent/>
            </Suspense>  
        </div>
    )
}

export default LoginPage