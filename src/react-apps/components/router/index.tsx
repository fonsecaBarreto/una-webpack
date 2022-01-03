import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

interface PageConfig {
    layout:React.ReactElement<any>
    prefix: String,
    routes: {component: React.Component, path: String, title: String }[] 
}


interface RenderProp {
    (props: any): React.ReactElement<()=>null>;
}

export function AppRouter({ pages }: { pages: PageConfig[]}){

	const RenderedPages = pages.map((p: PageConfig)=>{

        const { layout } = p

        const SquareBackground: React.FunctionComponent<any> = (props) => {
            return ( )
        };

        //Find out how to do it on ts
        return (
            <Layout>
                <Switch>
                    {
                        routes.map((r,i) =>{
                            const { path, component: Component, ...rest } = r
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
