import React, { ReactNode, useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import Guard from './Guard';
import globalContext from "@/react-apps/apps/main/global-components-context"
import BlueLagumLayout from '@/react-apps/layouts/BlueLagum' 
import { ROUTES } from './routes'
import { setLoading, setUser, setSessionAddress } from '@/react-apps/store/reducers/main/actions';
import { loginServices } from '@/services/api/login-service';
import { SessionLocation } from '@/domain/SessionLocation';

export function AppRouter({ }){

    const context = useContext(globalContext);
    const dispatch = useDispatch();
    var { user, god_mode } = useSelector((state:any)=>state.main) 

    const beforeEach = async () => {
      context.app.current?.scrollTo({ top: 0, behavior: 'auto'}); 
      
      if(!user){ 
        dispatch(setLoading(true));
        loginServices.verify()
          .then((user)=> dispatch(setUser(user)))
          .finally(()=> dispatch(setLoading(false)))
      }
      return null /* Se retornar um string, o app sera redirecionado para lá */
    }

    return ( 
		<Router>
			<Switch>
        <BlueLagumLayout user={user} god_mode={god_mode}>
          <Switch>     
            {
              ROUTES.map(({component: Component, ...rest }, i:number )=> (
              <Guard {...rest} key={i} location={location} component={Component} beforeEach={() =>beforeEach()} ></Guard>))
            }  
          </Switch>
        </BlueLagumLayout>
			</Switch> 
		</Router> 
	)
}

export default AppRouter

