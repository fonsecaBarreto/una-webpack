
import React, { useState } from 'react'
import './style.css' // Baixar em um arquivo separado
import LoginCard from './Cards' 

import { Controls }  from 'fck-components'
import { UseStateAdapter } from 'fck-components/lib/Controls'
import UnaSubmitButton from '../../components/una/SubmitButton'
import CadastroCarousel from '@/react-apps/components/una/CadastroCarousel'

const SIGNIN_INITIAL_DATA = {
    credencial: "Lucas Fonseca Barreto",
    senha: "123456"
}

export const LoginPage = () =>{
    const [ toSignup, setToSignup ] = useState(true)
    const signinState = UseStateAdapter(SIGNIN_INITIAL_DATA)

    const toggleMode = () =>{
        setToSignup(!toSignup)
    } 

    return (
        <div id="login-screen">     
            <LoginCard show={toSignup} title={"Cadastro"}>
                <CadastroCarousel> </CadastroCarousel>
                <UnaSubmitButton light onClick={toggleMode}> Já Sou Cadastrado</UnaSubmitButton>
            </LoginCard>

            <LoginCard show={!toSignup} title={"LOGIN"} sm >
                <Controls.TextBox state={signinState} label={"Usuario"} name={"credencial"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox state={signinState} label="Senha" name={"senha"} type={Controls.TextBoxTypes.PASSWORD}/> 
                <UnaSubmitButton>  Entrar </UnaSubmitButton>
                <UnaSubmitButton light onClick={toggleMode}>  Cadastrar-se</UnaSubmitButton>
            </LoginCard>
        </div>
    )
}

export default LoginPage


/*     useState(()=>{
        if(!history.location.search ) return;
        const mode = history.location.search.split("?v=")[1]
        switch (mode) {
            case 'signup': setToSignup(true); break;
            default: setToSignup(false); break;
        }
        const err = history.location.search.split("?e=")[1]
        if(err) return dialogState.showFailure(  err.replace(/%20/g, " "))
        
    },[history, history.location])
 */


/* 
export default () =>{
   


    const handleErrors = (err) =>{
        
        switch(err.name){
            case "InvalidFileBufferError": {
                dialogState.showFailure("Atenção!",err.message)
            };break;
            default: dialogState.showFailure(err.message)
        } 
    }
    return (
       
  )
} */