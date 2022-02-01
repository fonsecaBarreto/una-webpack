import React, { ReactNode, useEffect, useContext, ReactComponentElement, Children } from "react";
import BlueLagumLayout from '../../layouts/BlueLagum' 
import AppRouter, { PageRouterConfig } from '@/react-apps/components/router'
import { useDispatch, useSelector } from "react-redux";
import globalContext from "@/react-apps/apps/main/global-components-context"
import { setLoading, setUser } from "@/react-apps/store/reducers/main/actions"
import { loginServices } from '@/services/api/login-service'
import { Redirect } from "react-router-dom";

/* pages */
import DeparamentoPage from "../../pages/feed-busca-page";
import CompanhiasPage from "@/react-apps/pages/list-companhias-page";
import LoginPage from "@/react-apps/pages/login-page";
import CadastroPage from "@/react-apps/pages/register-page";


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
      {
        layout: BlueLagumLayout,
        layoutParams: {user, menu: false},
        prefix: "/login",  
        routes: [
            { path: "", title: "Login",  component: LoginPage } ,
        ],
        beforeEach
      }, 

      {
          layout: BlueLagumLayout,
          layoutParams : { user, menu: true, context },
          prefix: "/",
          routes: [
            { path: "mercado", title: "Mercado",  component: DeparamentoPage } ,
            { path: "companhias", title: "Companhias",  component: CompanhiasPage } ,
            { path: "departamentos", title: "Departamentos",  component: CadastroPage } ,
            { path: "", title: "Inicio",  component:() => <Redirect to="/mercado"></Redirect> } ,
            { path: "*", title: "404",  component: () => <div><h1>404</h1></div> }
         
          ],
          beforeEach
      },
    
    ]
    return ( <AppRouter pages={config}></AppRouter> )
}

export default RouterComponent
