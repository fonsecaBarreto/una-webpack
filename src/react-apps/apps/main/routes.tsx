import React from "react";
/* App Router */
import Router from "@/react-apps/components/Router"


export const ROUTES = [
     // mercado
    { path: "/mercado/:departament_id", title: "Mercado", } ,
    { path: "/mercado", title: "Mercado",  } ,
      // products
    { path: "/produto/:ean", title: "Produto", } ,
      // cotações
    { path: "/cotacoes/:budget_id", title: "Minhas Cotação", group:"user" } ,
    { path: "/cotacoes", title: "Minhas Cotações",  group:"user" } ,
    { path: "/login", title: "Login" } ,
    // Tuto
    { path: "/tutoriais", title: "Tutoriais"} ,

    { path: "/admin*", title: "Redirecionando para admin" } ,

    { path: "/", title: "Inicio" },
]

export const Routes = () => <Router routes={ROUTES}/>

export default Routes

