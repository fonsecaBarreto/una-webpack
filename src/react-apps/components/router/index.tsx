import React, { ReactNode, useState } from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom";
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
    routes: AppRouter.RouteConfig[],
    beforeEach?: Function,
    layoutParams?: any
}

export function AppRouter({ pages }: { pages: PageRouterConfig[]}){

    const Rendered =  pages.map((p: PageRouterConfig, j:number)=>{
        const { layout, routes, beforeEach, prefix="", layoutParams } = p
     
        return ( routes.map((r,i) => { 
      
            return ( 
                <Guard key={i} beforeRouter={beforeEach} 
                    location={location} 
                    component={r.component} 
                    layout={layout} 
                    layoutParams={layoutParams}
                    path={`${prefix}${r.path}`}>
                </Guard>
            ) 
        }))   
    })
    
    return ( 
		<Router>
			<Switch>
                { Rendered }
			</Switch>
		</Router> 
	)
}
export default AppRouter

