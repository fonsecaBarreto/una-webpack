import React, { FC, Suspense, useCallback, useEffect, useState, useContext, useRef } from 'react'
import { Route, BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GlobalContext } from "@/react-apps/apps/GlobalContext"
import { setLoading, setUser } from '@/react-apps/store/reducers/main/actions';
import { loginServices } from '@/services/api/login-service';

import ModalUnaLoading from '@/react-apps/layouts/components/ModalLoading';

export namespace AppRouter {
    export type RouteConfig = { 
        component: FC, path: string, location?: any | null, beforeEach?: Function } | any

    export type Params = { 
        routes: RouteConfig,
        layout: any,
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
            exact={true} location={location} path={path} 
            render={ (props) => ( 
                isGranted ? 
                <Component {...props} > </Component>
                : <Redirect to='/login' />
                ) }
            />)   
}
    
export const AppRouter: React.FunctionComponent<AppRouter.Params> = (props) => {
    const { layout: Layout, routes } = props
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
		<Router>
            <Switch>
           
                <Layout>
                    <Suspense fallback={<div/>}>
                        <Switch>     
                            { 
                                routes.map(({ component, path, ...rest }: any, i:number )=> (
                                    <Guard 
                                        key={i} location={location} 
                                        path={path} component={component} 
                                        beforeEach={beforeEach} {...rest} /> 
                                )) 
                            }
                              
                        </Switch>
                    </Suspense>
                </Layout>
            </Switch> 
		</Router> 
	)
}

{/* <Route path={`/${chuckAlias}*`}> </Route> */}
export default AppRouter

