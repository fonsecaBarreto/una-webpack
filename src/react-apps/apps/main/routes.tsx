import React, { ReactNode, useEffect, useContext, ReactComponentElement, Children } from "react";
import BlueLagumLayout from '../../layouts/BlueLagum' 
import AppRouter, { PageRouterConfig } from '@/react-apps/components/router'
import { useDispatch, useSelector } from "react-redux";
import globalContext from "@/react-apps/apps/main/global-components-context"
import { setLoading, setUser } from "@/react-apps/store/reducers/main/actions"
import { loginServices } from '@/services/api/login-service'
import { Redirect } from "react-router-dom";

/* pages */
import MartPage from "../../pages/mart-page";
import CompaniesPage from "@/react-apps/pages/companies-page";
import LoginPage from "@/react-apps/pages/login-page";
import CadastroPage from "@/react-apps/pages/register-page";
import ProfilePage from "@/react-apps/pages/profile-page";
import CotacoesPage from '@/react-apps/pages/budgets-page'
import ProductPage from '@/react-apps/pages/product-page'



export const RouterComponent = () =>{

    const context = useContext(globalContext) 
    const dispatch = useDispatch()
    var { user, god_mode }  = useSelector((state:any)=>state.main) 

    const beforeEach = async () =>{
        context.app.current?.scrollTo({ top: 0, behavior: 'auto'}); 

        if(!user){ 
          dispatch(setLoading(true));
          try{
            const user = await loginServices.verify()
            if(user && Object.keys(user).length > 0) dispatch(setUser(user));
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
        layoutParams: { user, menu: false },
        prefix: "/login",  
        routes: [
            { path: "", title: "Login",  component: LoginPage } ,
        ],
        beforeEach
      }, 

      {
          layout: BlueLagumLayout,
          layoutParams : { user, menu: true, god_mode, context },
          prefix: "/",
          routes: [
            /* Mercado */
            { path: "mercado/:departament_id", title: "Mercado",  component: MartPage } ,
            { path: "mercado", title: "Mercado",  component: MartPage } ,
            /* Companies */
            { path: "companhias/:company_id", title: "Companhias",  component: CompaniesPage } ,
            { path: "companhias", title: "Companhias",  component: CompaniesPage } ,
            /* Product page */
            { path: "produto/:ean", title: "Produto",  component: ProductPage } ,
            /* Regiser product */
            { path: "registro/:p", title: "Registar",  component: CadastroPage },
            { path: "registro", title: "Registar",  component: CadastroPage },
            { path: "cotacoes", title: "Cotações", component: CotacoesPage },
            { path: "perfil/:id", title: "Perfil Companhia",  component: ProfilePage } ,
            { path: "", title: "Inicio",  component:() => <Redirect to="/mercado"></Redirect> } ,
            { path: "*", title: "404",  component: () => <div><h1>404</h1></div> }
          ],
          beforeEach
      },
    
    ]
    return ( <AppRouter pages={config}></AppRouter> )
}

export default RouterComponent
