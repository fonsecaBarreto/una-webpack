import React, { ReactNode, useEffect, useContext, ReactComponentElement } from "react";

import BlueLakeLayout from '../../layouts/BlueLake' 
/* Paginas */
import ListCompanhiasPage from "@/react-apps/pages/list-companhias-page";
import AppRouter, { PageRouterConfig } from '@/react-apps/components/router'
import { ADMIN_TREE } from './MENU-TREE'
export const RouterComponent = () =>{
  console.log("Roteador componente")
  const config: PageRouterConfig[] =[ 
      {
          layout: ({children}) => <BlueLakeLayout menuTree={ADMIN_TREE}>{children}</BlueLakeLayout>,
          prefix: "/admin/",
          routes: [
              { path: "companhias", title: "Companhias",  component: ListCompanhiasPage } ,
              { path: "*", title: "404",  component: () => <div><h1>404</h1></div> } 
          ]
      }
  ]
  return ( <AppRouter pages={config}></AppRouter> )
}

export default RouterComponent