import React, { ReactNode, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Guard from './RouteGuard'


export enum AccessType {
    ANY_USER,
    ADMIN
}

export namespace AppRouter { 
    export type RouteConfig = {
        component: React.FunctionComponent<any>, 
        path: String, title: String,
        access?: AccessType[]
    }
}

export interface PageRouterConfig {
    layout: React.FunctionComponent<{children?: ReactNode}>
    prefix?: String,
    routes: AppRouter.RouteConfig[] 
}

export function AppRouter({ pages }: { pages: PageRouterConfig[]}){
	return ( 
		<Router>
			<Switch>
                {   pages.map((p: PageRouterConfig, j:number)=>{
                        const { layout, routes, prefix="" } = p
                        return ( routes.map((r,i) => (
                            <Guard location={location} key={i} component={r.component} layout={layout} path={`${prefix}${r.path}`} ></Guard>)))
                    })}
			</Switch>
		</Router> 
	)
}
export default AppRouter
{/* <Route path="/" exact> <Redirect to={root} /> </Route>  */}
                                   
