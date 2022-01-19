import React, { ReactNode, useEffect, useContext, ReactComponentElement } from "react";

import BlueLagumLayout from '../../layouts/BlueLagum' 
import DeparamentoPage from "../../pages/feed-busca-page";
import LoginPage from "@/react-apps/pages/login-page";
import AppRouter, { PageRouterConfig } from '@/react-apps/components/router'
import { useDispatch, useSelector } from "react-redux";
import globalContext from "@/react-apps/apps/main/global-components-context"
import { setLoading, setUser } from "@/react-apps/store/reducers/main/actions"
import { loginServices } from '@/services/api/login-service'
export const RouterComponent = () =>{

    const context = useContext(globalContext) 
    const dispatch = useDispatch()
    var { user }  = useSelector((state:any)=>state.main) 

    const beforeEach = async () =>{
        context.app.current?.scrollTo({ top: 0, behavior: 'auto'}); 
        if(!user){ 
          dispatch(setLoading(true));
          try{
            const user = await loginServices.verify()
            dispatch(setUser(user));
          }catch(err){
            console.log("Nenhum usuario encontrado")
            //SetRedirect(`/login?e=${err.message}`)
          }finally{
            dispatch(setLoading(false));
          }
        }
        return null
        /* Se retornar um string, o app sera redirecionado para lá */
    }


    const config: PageRouterConfig[] =[ 

        /* Aqui o layout secundario */
        {
           layout: ({children}: {children?: ReactNode}) => <div> Aqui sou o layout Secundario  {children}</div>,
           prefix: "/outro", 
           routes: [{
               component: () => <div> Componente teste para o layout Secundario </div>,
               path: "", 
               title: "Pagina adm"
           }],
           beforeEach
       },
       /* Layout Principal aqui */
       {
           layout: BlueLagumLayout,
           prefix: "/",
           routes: [
               { path: "login", title: "Login",  component: LoginPage } ,
               { path: "", title: "Inicio",  component: DeparamentoPage } ,
               { path: "*", title: "404",  component: () => <div><h1>404</h1></div> } 
           ],
           beforeEach
       }
    ]


    return ( <AppRouter pages={config}></AppRouter> )
}

export default RouterComponent