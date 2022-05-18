import React, { Children, lazy, useContext } from "react";
import Layout from '@/react-apps/layouts/BlueStatic' 
import Router from "@/react-apps/components/Router"
/* pages */
import LandingPage from "@pages/landing-page";
import { Redirect } from "react-router-dom";

export const ROUTES = [
    { path: "/", title: "Inicio",  component:() => <LandingPage></LandingPage> } ,
]

export const Routes = () => {

    const beforeEach = async () => {
        return null 
    }

    return (
        <React.Fragment>
            <Router 
                chuckAlias=""
                routine={()=>beforeEach()}
                routes={ROUTES}
                layout={Layout}>
            </Router>
        </React.Fragment>
    )
}

export default Routes

