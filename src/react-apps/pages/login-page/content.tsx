import React, { Suspense, useContext, useEffect, useState } from 'react'

import LoginCard from './Cards' 
import UnaSubmitButton from '../../components/una/inputs-control/SubmitButton'
import { useHistory } from 'react-router-dom'
import { loginServices } from '@/services/api/login-service'
import CadastroCarousel from '@/react-apps/components/una/CadastroCarousel'
import { useDispatch } from 'react-redux'
import { setLoading, setUser } from '@/react-apps/store/reducers/main/actions'
import UseStateAdapter from 'fck-react-input-controls/lib/Controls/StateAdapter'
import { Controls } from 'fck-react-input-controls'
import { TextBox } from 'fck-react-input-controls/lib/Controls' 


const SIGNIN_INITIAL_DATA = {
    credencial: "",
    senha: ""
}
export const LoginContent = () =>{

    const dispatch = useDispatch()
    const [ isLoading, setIsLoading ] = useState(false)
    const history = useHistory()
    const [ toSignup, setToSignup ] = useState(false)
    const signinState = UseStateAdapter(SIGNIN_INITIAL_DATA)
    const toggleMode = () => history.push(`/login?v=${toSignup ? "signin" : 'signup'}`)
    const [ errMessage, setErrMessage ] = useState("")
    const submitLogin = () =>{

        setIsLoading(true);
        loginServices.signin(signinState.data.get)
        .then((_)=>{ 
            loginServices.verify()
                .then((user)=> dispatch(setUser(user)))
                .finally(()=> {
                    dispatch(setLoading(false))
                    return history.push("/")
                })
        })
        .catch(err=>{
            switch(err.name){
                case "AccessDeniedError":
                    setErrMessage("Email ou senha estão incorretos")
                break;
            }
            if(err.params){
                signinState.errors.set(err.params);
            }
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
                 <TextBox state={signinState} placeHolder="Insira seu E-mail de acesso" label={"Email"} name={"credencial"} type={Controls.TextBoxTypes.TEXT}/>
                <TextBox state={signinState} placeHolder="Insira sua senha de acesso" label="Senha" name={"senha"} type={Controls.TextBoxTypes.PASSWORD}/> 
                {errMessage && <span className='login-err-msg'> { errMessage} </span>}
                <UnaSubmitButton className={"login-entry-btn"} onClick={submitLogin}>  Entrar </UnaSubmitButton>
                <UnaSubmitButton light onClick={toggleMode}>  Cadastrar-se</UnaSubmitButton>
            </LoginCard>
        </div>
    )
}

export default LoginContent