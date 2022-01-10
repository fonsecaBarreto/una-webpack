import React, { ReactNode, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

export namespace AppRouter { 
    export type RouteConfig = {
        component: React.FunctionComponent<any>, 
        path: String, title:
         String
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
                {
                    pages.map((p: PageRouterConfig, j:number)=>{
                        const { layout: Layout, routes, prefix="" } = p
                        return (
                            routes.map((r,i) =>{
                                const { path, component: Component, /* ...rest  */} = r
                                console.log(`${prefix}${path}`)
                                return <Route exact={true} key={i} path={`${prefix}${path}`} render={ (props) => { return (<Layout > <Component {...props} /> </Layout>) }}  /> 
                            }) //location={location} 
                        )
                    })
                }
			</Switch>
		</Router> 
	)
}
export default AppRouter


			   	{/* <Route path="/" exact> <Redirect to={root} /> </Route>  */}
                                   
                    /* 	const { path, component: Component, ...rest } = r; */
                    /* 	return ( <Guard {...rest} path={path} exact key={i} component={component}/> )	  */