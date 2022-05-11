import React, { lazy, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from "@/react-apps/apps/GlobalContext"
import BlueLagumLayout from '@/react-apps/layouts/BlueLagum' 
import { setLoading, setUser } from '@/react-apps/store/reducers/main/actions';
import { loginServices } from '@/services/api/login-service';
/* App Router */
import Router from "@/react-apps/components/Router"
import { Redirect } from "react-router-dom";
/* pages */

const CadastroPage = lazy(() => import('@pages/register-page'));
const CotacoesPage = lazy(() => import('@pages/budgets-page'));
const CompaniesPage = lazy(() => import('@pages/companies-page'));

const goToMain: any= (location:any) =>{
  return window.location.href= location.pathname
}


export const ROUTES = [
  { path: "/admin/companhias/:company_id", title: "Companhias",  component: CompaniesPage } ,
  { path: "/admin/companhias", title: "Companhias",  component: CompaniesPage } ,
  { path: "/admin/registro/:section", title: "Registar",  component: CadastroPage },
  { path: "/admin/registro", title: "Registar", component: CadastroPage },
  { path: "/admin/cotacoes", title: "Cotações", component: CotacoesPage },
  { path: "/admin", title: "Inicio",  component:() => <Redirect to="/admin/companhias"></Redirect> } ,
  { path: "/*", title: "Redirecionando para Aplicação principal",  component: ({ location }: any) => goToMain(location) } ,
]

export const Routes = () => {
    
    const dispatch = useDispatch()
    var { user } = useSelector((state:any)=>state.main);
    const context = useContext(GlobalContext);

    const beforeEach = async () => {
        context.app.current?.scrollTo({ top: 0, behavior: 'auto'}); 
        if(!user){ 
          dispatch(setLoading(true));
          loginServices.verify()
            .then((user)=> dispatch(setUser(user)))
            .finally(()=> dispatch(setLoading(false)))
        }
        /* DEVO CRIAR ALGUM TIPO DE COMPORTAMENTO CASO NAO SEJA UM ADMIN */
        return null 
    }

    return (
        <React.Fragment>
            <Router 
                chuckAlias="admin"
                routine={()=>beforeEach()}
                routes={ROUTES}
                layout={BlueLagumLayout}>
            </Router>
        </React.Fragment>
    )
}

export default Routes

