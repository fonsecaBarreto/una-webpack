import React, { lazy, useContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from "@/react-apps/apps/GlobalContext"
import BlueLagumLayout from '@/react-apps/layouts/BlueLagum' 
import { setLoading, setUser } from '@/react-apps/store/reducers/main/actions';
import { loginServices } from '@/services/api/login-service';
/* App Router */
import Router from "@/react-apps/components/Router"
/* pages */
import ProfilePage from "@pages/profile-page";
import ProductPage from '@pages/product-page'
import { Redirect } from "react-router-dom";

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
    /*   component:() => <Redirect to="/registro/fornecimento"></Redirect> } */
    /* cotações */
    { path: "/perfil/usuario/:user_id", title: "Perfil Companhia",  component: ProfilePage } ,
    { path: "/perfil/companhias/:company_id", title: "Perfil Companhia",  component: ProfilePage },
    { path: "/login", title: "Login",  component: LoginPage } ,
    /* REDIRECTS */
    { path: "/admin*", title: "Redirecionando para admin",  component: ({ location }: any) => goToAdmin(location) } ,
    { path: "/", title: "Inicio",  component:() => <Redirect to="/mercado"></Redirect> } ,
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
        return null 
    }

    return (
        <React.Fragment>
            <Router 
                chuckAlias=""
                routine={()=>beforeEach()}
                routes={ROUTES}
                layout={BlueLagumLayout}>
            </Router>
        </React.Fragment>
    )
}

export default Routes

