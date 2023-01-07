import React, { lazy } from "react";
/* App Router */
import Router from "@/react-apps/components/Router"
/* pages */
import ProductPage from '@pages/product-page'

import TutoriaisPage from "@pages/Tutoriais"

import HomePage from "@pages/HomePage";

const MartPage = lazy(() => import('@pages/mart-page'));
const LoginPage = lazy(() => import('@pages/login-page'));

const Cotacoes = lazy(() => import('@pages/cotacoes/index/index'));
const Cotacoes_numero = lazy(() => import('@pages/cotacoes/[budget_id]/index'));

export const ROUTES = [
     // mercado
    { path: "/mercado/:departament_id", title: "Mercado",  component: MartPage } ,
    { path: "/mercado", title: "Mercado",  component: MartPage } ,
      // products
    { path: "/produto/:ean", title: "Produto",  component: ProductPage } ,
      // cotações
    { path: "/cotacoes/:budget_id", title: "Minhas Cotação",  component: Cotacoes_numero, group:"user" } ,
    { path: "/cotacoes", title: "Minhas Cotações",  component: Cotacoes, group:"user" } ,
    { path: "/login", title: "Login",  component: LoginPage } ,
    // Tuto
    { path: "/tutoriais", title: "Tutoriais",  component: TutoriaisPage } ,

    { path: "/admin*", title: "Redirecionando para admin",  component: ({ location }: any) =>  window.location.href= `https://app.unacompras.com.br${location.pathname}` } ,

    { path: "/", title: "Inicio",  component: HomePage },
]

export const Routes = () => <Router routes={ROUTES}/>

export default Routes

