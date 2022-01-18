import React, { ReactNode, useEffect } from "react";

import BlueLagumLayout from '../../components/Layouts/BlueLagum' 
import DeparamentoPage from "../../pages/feed-busca-page";
import LoginPage from "@/react-apps/pages/login-page";
import AppRouter, { PageRouterConfig } from '@/react-apps/router'

const config: PageRouterConfig[] =[ 

    /* Aqui o layout secundario */
    {
       layout: ({children}: {children?: ReactNode}) => <div> Aqui sou o layout Secundario  {children}</div>,
       prefix: "/admin", 
       routes: [{
           component: () => <div> Componente teste para o layout Secundario </div>,
           path: "", 
           title: "Pagina adm"
       }]
   },
   /* Layout Principal aqui */
   {
       layout: BlueLagumLayout,
       prefix: "/",
       routes: [
           { path: "login", title: "Login",  component: LoginPage } ,
           { path: "", title: "Inicio",  component: DeparamentoPage } ,
           { path: "*", title: "404",  component: () => <div><h1>404</h1></div> } 
       ]
   }
  
]

export const RouterComponent = () =>{
    return (
        <AppRouter pages={config}></AppRouter>
    )
}

export default RouterComponent