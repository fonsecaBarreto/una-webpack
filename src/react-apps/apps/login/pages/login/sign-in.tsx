import TextInput from "@/react-apps/components/controls/Inputs/TextInput";
import React, { useCallback, useEffect, useRef, useState } from "react"
import LoginCard from "../../components/Cards";
import { LoginTemplateScreen } from "../../components/Template";

const SIGNIN_INITIAL_DATA = {
   credencial: "",
   senha: ""
}

export const HomePage = () => {
   const [isClient, setIsClient] = useState(false);
   const [ isLoading, setIsLoading ] = useState(false)

   useEffect(() => {
      setIsClient(true);
   }, []);

   return (
      <>
         <LoginTemplateScreen
            title={"Bem-vindo de volta!"}
            lead={"Una A praticidade de comprar ao melhor preço"}
         >
            <LoginCard show title={"LOGIN"} sm loading={isLoading} >

               <form>
                  <label>
                     <span> Tsnasodsad </span>
                     <input></input>
                     <span> Error aquis </span>
                  </label>

                  <label>
                     <span> Tsnasodsad </span>
                     <input></input>
                     <span> Error aquis </span>
                  </label>
                  
               </form>
               {/*    <Controls.TextBox state={signinState} placeHolder="Insira seu E-mail de acesso" label={"Email"} name={"credencial"} type={Controls.TextBoxTypes.TEXT}/>
                  <Controls.TextBox state={signinState} placeHolder="Insira sua senha de acesso" label="Senha" name={"senha"} type={Controls.TextBoxTypes.PASSWORD}/> */} 
               {/*               <UnaSubmitButton className={"login-entry-btn"} onClick={submitLogin}>  Entrar </UnaSubmitButton>
                  <UnaSubmitButton light onClick={toggleMode}>  Cadastrar-se</UnaSubmitButton> */}
            </LoginCard>
         </LoginTemplateScreen>
      </>
  )
}


export default HomePage