import React, { lazy } from "react";

import BlueLagumLayout from '@/react-apps/layouts/BlueLagum' 
/* App Router */
import Router from "@/react-apps/components/Router"
/* pages */
import ProfilePage from "@pages/profile-page";
import ProductPage from '@pages/product-page'

import TutoriaisPage from "@pages/Tutoriais"

import HomePage from "@pages/HomePage";

const MartPage = lazy(() => import('@pages/mart-page'));
const LoginPage = lazy(() => import('@pages/login-page'));

const Cotacoes = lazy(() => import('@pages/cotacoes/index/index'));
const Cotacoes_numero = lazy(() => import('@pages/cotacoes/[budget_id]/index'));

export const ROUTES = [
    /* /mercado */
    { path: "/mercado/:departament_id", title: "Mercado",  component: MartPage } ,
    { path: "/mercado", title: "Mercado",  component: MartPage } ,
    /* /products */
    { path: "/produto/:ean", title: "Produto",  component: ProductPage } ,
    /* cotações */
    { path: "/cotacoes/:budget_id", title: "Minhas Cotação",  component: Cotacoes_numero, group:"user" } ,
    { path: "/cotacoes", title: "Minhas Cotações",  component: Cotacoes, group:"user" } ,
    /* Passar perfil para admin */
    { path: "/perfil/usuario/:user_id", title: "Perfil Companhia",  component: ProfilePage } ,
    { path: "/perfil/companhias/:company_id", title: "Perfil Companhia",  component: ProfilePage },
    { path: "/login", title: "Login",  component: LoginPage } ,
    /* Tutoriais */
    { path: "/tutoriais", title: "Tutoriais",  component: TutoriaisPage } ,
    { path: "/", title: "Inicio",  component: HomePage },
]

export const Routes = () => <Router  routes={ROUTES} layout={BlueLagumLayout}/>

export default Routes

