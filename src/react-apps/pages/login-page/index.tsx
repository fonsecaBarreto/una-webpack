
import React, { useEffect, useState } from 'react'
import './style.css' // Baixar em um arquivo separado
import LoginCard from './Cards' 

import { Controls }  from 'fck-components'
import { UseStateAdapter } from 'fck-components/lib/Controls'
import UnaSubmitButton from '../../components/una/SubmitButton'
import CadastroCarousel from '@/react-apps/components/una/CadastroCarousel'
import { useHistory } from 'react-router-dom'

const SIGNIN_INITIAL_DATA = {
    credencial: "Lucas Fonseca Barreto",
    senha: "123456"
}

export const LoginPage = () =>{
    const history = useHistory()
    const [ toSignup, setToSignup ] = useState(false)
    const signinState = UseStateAdapter(SIGNIN_INITIAL_DATA)

    const toggleMode = () =>{ setToSignup(!toSignup)  } 

    useEffect(()=>{
        if(!history.location.search ) return;

        const mode = history.location.search.split("?v=")[1]
        switch (mode) {
            case 'signup': setToSignup(true); break;
            default: setToSignup(false); break;
        }
    },[history, history.location])

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