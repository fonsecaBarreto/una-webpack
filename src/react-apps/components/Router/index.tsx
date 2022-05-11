import React, { FC, Suspense, useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Redirect, Switch } from "react-router-dom";

export namespace AppRouter {
    export type RouteConfig = { component: FC, path: string, location?: any | null, beforeEach?: Function } | any

    export type Params = { 
        routes: RouteConfig,
        layout: any,
        routine: any,
        chuckAlias: string
    }
}

const Guard: React.FunctionComponent<AppRouter.RouteConfig> = ({ chuckAlias="", component: Component, path, beforeEach, location }) => {

    const [ redirectTo, SetRedirectTo ] = useState("");
    
    useEffect(()=>{ beforeRouterHandler() },[path])
  
    const beforeRouterHandler = async () => {
        var redirect = beforeEach && await beforeEach()
        if(redirect) SetRedirectTo(redirect);
    } 
  
    if(redirectTo != "") return(<Redirect to={redirectTo} ></Redirect>);
    return ( 
        <Route exact={true} path={path} render={ (props) => ( <Component {...props} > </Component>) } /> 
    )
}
  
export const AppRouter: React.FunctionComponent<AppRouter.Params> = ({ chuckAlias="", layout: Layout, routes, routine }) => {

    return ( 
		<Router>
            <Switch>
                <Layout>
                    <Suspense fallback={<div>Carregando...</div>}>
                        <Switch>     
                        {
                            routes.map(({ ...rest }, i:number )=> (
                                <Guard
                                beforeEach={routine}
                                key={i} 
                                location={location}
                                {...rest} >
                            </Guard>))
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

