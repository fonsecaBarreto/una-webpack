import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

export function AppRouter({ pages, root="/" }){

	const RenderedPages = pages.map((p)=>{

        const { layout: Layout, routes, prefix="" } = p
        return (
            <Layout>
                <Switch>
                    {
                        routes.map((r,i) =>{
                            const { path, component: Component } = r
                            return <Route key={i} path={`/${prefix}${path}`} {...rest} render={ (props) => <Component {...props} /> }  />
                            /* location={location}  */ 
                        })
                    }
                </Switch> 
            </Layout>
        )

	/* 	const { path, component: Component, ...rest } = r; */

	/* 	return ( <Guard {...rest} path={path} exact key={i} component={component}/> )	  */
	}); 

	return ( 

		<Router>
			<Switch>
			{/* 	<Route path="/" exact> <Redirect to={root} /> </Route> */}
                { RenderedPages }
	{/* 			<Layout>  
					<Switch> { RenderedPages } </Switch> 
				</Layout> */}
			</Switch>
		</Router> 
	)
}
export default AppRouter
