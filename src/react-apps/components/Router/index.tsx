import React, { FC, Suspense, useEffect, useState, useContext, useRef, lazy } from 'react'
import { Route, Redirect, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from "@/react-apps/apps/GlobalContext"
import { setLoading, setUser } from '@/react-apps/store/reducers/main/actions';
import { loginServices } from '@/services/api/login-service';
import ModalUnaLoading from '@/react-apps/layouts/components/ModalLoading';
import BlueLagumLayout from '@/react-apps/layouts/BlueLagum';
import HomePage from '@/react-apps/pages/HomePage';

const LoginPage = lazy(() => import('@pages/login-page'));
const TutoriaisPage = lazy(() => import('@pages/Tutoriais'));
const Cotacoes = lazy(() => import('@pages/cotacoes/index/index'));
const Cotacoes_numero = lazy(() => import('@pages/cotacoes/[budget_id]/index'));
const ProductPage = lazy(() => import('@/react-apps/pages/product-page'));
const MartPage = lazy(() => import('@/react-apps/pages/mart-page'));



export namespace AppRouter {
    export type RouteConfig = { 
        component: FC, path: string, location?: any | null, beforeEach?: Function } | any

    export type Params = { 
        routes: RouteConfig,
    }
}

const Guard: React.FunctionComponent<AppRouter.RouteConfig> = (props) => {

    const [ isGranted, setIsGranted ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(true);
    const { component: Component, path, location, beforeEach }  = props;

    useEffect(()=>{ 
        beforeEach(props).then((res: any)=>{
            setIsGranted(res);
            setIsLoading(false);
        })
    },[path])

    if(isLoading) return <ModalUnaLoading/>
    return (
      <Route
        exact={true}
        location={location}
        path={path}
        render={(props) =>
          isGranted ? (
            <Component {...props}> </Component>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );   
}
    
export const AppRouter: React.FunctionComponent<AppRouter.Params> = (props) => {

    const [ isClient, setIsClient ] = useState(false)

    useEffect(()=>{
        setIsClient(true);
    },[])

    const {routes } = props
    const context = useContext(GlobalContext);
    var { user } = useSelector((state:any)=>state.main);
    const userRef = useRef(null)
    const loadingRef = useRef(false)
    const dispatch = useDispatch()

    useEffect(()=>{ userRef.current = user },[user])
    useEffect(()=>{beforeAll()},[])

    const beforeAll = () => {
        dispatch(setLoading(true))
        loadingRef.current = true;
        loginServices.verify()
            .then((user)=>{
                userRef.current = user;
                dispatch(setUser(user))
            })
            .finally(()=>{
                dispatch(setLoading(false))
                loadingRef.current = false;
            })
    }

    const beforeEach =async ( config: AppRouter.RouteConfig) => {
        const  { group, path } = config;
        console.log("changed", path, group)
        context.app.current?.scrollTo({ top: 0, behavior: 'auto'}); 
        if(group !== "user" || userRef.current) return Promise.resolve(true);

        // In case of first load it could take some time to fetch user
        return new Promise((res)=>{
            setTimeout(()=>{
                return res(userRef.current ? true : false);
            },1000)
        })
    }

    return (

        <Switch>
            <BlueLagumLayout isClient={isClient}>
                { isClient && <Suspense fallback={<ModalUnaLoading/>}>    
                    <Switch>
                        <Guard path={"/mercado/:departament_id"} component={MartPage} beforeEach={beforeEach}/>
                        <Guard path={"/mercado"} component={MartPage} beforeEach={beforeEach}/>
                        <Guard path={"/produto/:ean"} component={ProductPage} beforeEach={beforeEach}/>
                        <Guard path={"/cotacoes/:budget_id"} component={Cotacoes_numero} beforeEach={beforeEach} group={"user"}/>
                        <Guard path={"/cotacoes/"} component={Cotacoes} beforeEach={beforeEach}  group={"user"}/>
                        <Guard path={"/tutoriais"} component={TutoriaisPage} beforeEach={beforeEach} />
                        <Guard path={"/login"} component={LoginPage} beforeEach={beforeEach} />
                        <Guard path={"/"} component={HomePage} beforeEach={beforeEach} />                  
                    </Switch>
                </Suspense>}
            </BlueLagumLayout>
        </Switch>
    ); 
	
}

export default AppRouter



/* component: ({ location }: any) =>  window.location.href= `https://app.unacompras.com.br${location.pathname}` */