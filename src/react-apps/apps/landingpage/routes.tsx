import React, { Children, lazy, useContext } from "react";
import BlueLagumLayout from '@/react-apps/layouts/BlueLagum' 
import Router from "@/react-apps/components/Router"
/* pages */
import LandingPage from "@pages/landing-page";
import { Redirect } from "react-router-dom";

export const ROUTES = [
    { path: "/", title: "Inicio",  component:() => <LandingPage></LandingPage> } ,
]


const NoLayout: React.FunctionComponent<any> = ({children}) =>{
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    )
}

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
                layout={NoLayout}>
            </Router>
        </React.Fragment>
    )
}

export default Routes

