import React from "react";

/* pages */
import HomePage from "@pages/HomePage";
import MartPage from "@pages/mart-page";
import CompaniesPage from "@pages/companies-page";
import LoginPage from "@pages/login-page";
import CadastroPage from "@pages/register-page";
import ProfilePage from "@pages/profile-page";
import CotacoesPage from '@pages/budgets-page'
import ProductPage from '@pages/product-page'
import { Redirect } from "react-router-dom";

export const ROUTES = [
  /* /mercado */
  { path: "/mercado/:departament_id", title: "Mercado",  component: MartPage } ,
  { path: "/mercado", title: "Mercado",  component: MartPage } ,
  /* /companhia */
  { path: "/companhias/:company_id", title: "Companhias",  component: CompaniesPage } ,
  { path: "/companhias", title: "Companhias",  component: CompaniesPage } ,
  /* /products */
  { path: "/produto/:ean", title: "Produto",  component: ProductPage } ,
  /* ADMINS */
  /* registro */
  { path: "/registro/:section", title: "Registar",  component: CadastroPage },
  { path: "/registro", title: "Registar", component: CadastroPage },
/*   component:() => <Redirect to="/registro/fornecimento"></Redirect> } */
  /* cotações */
  { path: "/cotacoes", title: "Cotações", component: CotacoesPage },
  { path: "/perfil/usuario/:user_id", title: "Perfil Companhia",  component: ProfilePage } ,
  { path: "/perfil/companhias/:company_id", title: "Perfil Companhia",  component: ProfilePage },
  { path: "/login", title: "Login",  component: LoginPage } ,
  /* REDIRECTS */
  { path: "/", title: "Inicio",  component:() => <Redirect to="/mercado"></Redirect> } ,
 /*  { path: "*", title: "404",  component: () => <div><h1>404</h1></div> } */
]