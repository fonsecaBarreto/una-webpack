import React, { lazy } from "react";


import BlueLagumLayout from '@/react-apps/layouts/BlueLagum' 

/* App Router */
import Router from "@/react-apps/components/Router"
/* pages */
import ProfilePage from "@pages/profile-page";
import ProductPage from '@pages/product-page'
import MinhasCotacoes from '@pages/MinhasCotacoes'
import TutoriaisPage from "@pages/Tutoriais"

import HomePage from "@pages/HomePage";
import Cotacao from "@/react-apps/pages/Cotacao";

const MartPage = lazy(() => import('@pages/mart-page'));
const LoginPage = lazy(() => import('@pages/login-page'));

const goToAdmin: any= (location:any) =>{
    return window.location.href= location.pathname
}

export const ROUTES = [
    /* /mercado */
    { path: "/mercado/:departament_id", title: "Mercado",  component: MartPage } ,
    { path: "/mercado", title: "Mercado",  component: MartPage } ,
    /* /products */
    { path: "/produto/:ean", title: "Produto",  component: ProductPage } ,
    /* cotações */
    { path: "/cotacoes/:budget_id", title: "Minhas Cotação",  component: Cotacao, group:"user" } ,
    { path: "/cotacoes", title: "Minhas Cotações",  component: MinhasCotacoes, group:"user" } ,

    /* Passar perfil para admin */
    { path: "/perfil/usuario/:user_id", title: "Perfil Companhia",  component: ProfilePage } ,
    { path: "/perfil/companhias/:company_id", title: "Perfil Companhia",  component: ProfilePage },
    { path: "/login", title: "Login",  component: LoginPage } ,

    /* Tutoriais */

    { path: "/tutoriais", title: "Tutoriais",  component: TutoriaisPage } ,
    { path: "/", title: "Inicio",  component: HomePage },
    
    /* REDIRECTS */
    { path: "/admin*", title: "Redirecionando para admin",  component: ({ location }: any) => goToAdmin(location) } ,
/*     { path: "/", title: "Inicio",  component:() => <Redirect to="/mercado"></Redirect> } , */
]

export const Routes = () => <Router  routes={ROUTES} layout={BlueLagumLayout}/>


export default Routes

