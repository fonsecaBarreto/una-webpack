import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Guard from './RouteGuard'


export function AppRouter({ layout: Layout, routes, prefix, root="/inicio" }){

	const RenderedPages = routes.map((r,i)=>{
		const { path, component: Component, ...rest } = r;

        return <Route key={i} path={`/${prefix}${path}`}  /* location={location}  */ {...rest} render={ (props) => <Component {...props}  /> }  />
	/* 	return ( <Guard {...rest} path={path} exact key={i} component={component}/> )	  */
	}); 

	return ( 

		<Router>
			<Switch>
				<Route path="/" exact> <Redirect to={root} /> </Route>
				<Layout>  
					<Switch> { RenderedPages } </Switch> 
				</Layout>
			</Switch>
		</Router> 
	)
}
export default AppRouter
