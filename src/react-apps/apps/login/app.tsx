
import React, { useState } from 'react'
import './style.css'
import LoginCard from './Cards' 

import { Forming, Controls }  from 'fck-components'
import { UseStateAdapter } from 'fck-components/lib/Controls'

const INITIAL_DATA = {
    nome: "Lucas Fonseca Barreto",
    email: "lucasfonsecab@hotmail.com",
    telefone: "22997836256",
    cpf: "0000000000",
    senha: "123456"
}

export const LoginPage = () =>{
    const [ toSignup, setToSignup ] = useState(false)
    const state = UseStateAdapter(INITIAL_DATA)

    const toggleMode = () =>{
        setToSignup(!toSignup)
    } 

    return (
        <div id="login-screen">     
            <LoginCard show={toSignup} title={"Cadastro"} submitText="Cadastrar">
                <Controls.TextBox state={state} label={"Nome"} name={"nome"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox state={state} label={"E-mail"} name={"email"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox state={state} label={"Telefone"} name={"telefone"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox state={state} label={"CPF"} name={"cpf"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox state={state} label="Senha" name={"senha"} type={Controls.TextBoxTypes.PASSWORD}/> 
                <Controls.TextBox state={state} label='Confirme a senha' name={"senhaconfirmacao"} type={Controls.TextBoxTypes.PASSWORD}/> 
            </LoginCard>

            <LoginCard show={!toSignup} title={"Entrar"} submitText="Entrar">
                <div> Aqui ou entrar</div>
            </LoginCard>

            <button onClick={toggleMode}> Cadastro aqui </button>

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