
import React, { useContext, useEffect, useState } from 'react'
import './style.css' // Baixar em um arquivo separado
import LoginCard from './Cards' 
import { Controls, Forming }  from 'fck-components'
import { UseStateAdapter } from 'fck-components/lib/Controls'
import UnaSubmitButton from '../../components/una/SubmitButton'
import CadastroCarousel from '@/react-apps/components/una/CadastroCarousel'
import { useHistory } from 'react-router-dom'
import { loginServices } from '@/services/login-service'
import globalContext from '@/react-apps/apps/main/global/global-components-context'
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import { setLoading } from '@/react-apps/store/reducers/main/actions'

const SIGNIN_INITIAL_DATA = {
    credencial: "17528147540",
    senha: "123456"
}

export const LoginPage = () =>{
    const GlobalContext = useContext(globalContext)
    const [ isLoading, setIsLoading ] = useState(false)
    const history = useHistory()
    const [ toSignup, setToSignup ] = useState(false)
    const signinState = UseStateAdapter(SIGNIN_INITIAL_DATA)
    const toggleMode = () => history.push(`/login?v=${toSignup ? "signin" : 'signup'}`)

    const submitLogin = () =>{
        setIsLoading(true);
        loginServices.signin(signinState.data.get)
        .then((_)=>history.push("/"))
        .catch(err=>{
            switch(err.name){
                case "AccessDeniedError":
                    GlobalContext.dialog.push(MakeNotification(()=>-1,[ "Credencial ou senha estão incorretos" ], err.message, NotificationType.FAILURE))
                break;
            }
            signinState.errors.set(err.params)
        })
        .finally(()=>setIsLoading(false))
    }

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
            <LoginCard show={toSignup} title={"Cadastro"} loading={isLoading}>
                <CadastroCarousel setLoading={setIsLoading}> </CadastroCarousel>
                <UnaSubmitButton light onClick={toggleMode}> Já Sou Cadastrado</UnaSubmitButton>
            </LoginCard>

            <LoginCard show={!toSignup} title={"LOGIN"} sm loading={isLoading} >
                <Controls.TextBox state={signinState} label={"Usuario"} name={"credencial"} type={Controls.TextBoxTypes.TEXT}/>
                <Controls.TextBox state={signinState} label="Senha" name={"senha"} type={Controls.TextBoxTypes.PASSWORD}/> 
                <UnaSubmitButton className={"login-entry-btn"} onClick={submitLogin}>  Entrar </UnaSubmitButton>
                <UnaSubmitButton light onClick={toggleMode}>  Cadastrar-se</UnaSubmitButton>
            </LoginCard>
        </div>
    )
}

export default LoginPage