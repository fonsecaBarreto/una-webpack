import React, { ReactNode, useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import Guard from './Guard';
import globalContext from "@/react-apps/apps/main/global-components-context"
import BlueLagumLayout from '@/react-apps/layouts/BlueLagum' 
import { ROUTES } from './routes'
import { setLoading, setUser, setUserAddress } from '@/react-apps/store/reducers/main/actions';
import { loginServices } from '@/services/api/login-service';
import { global } from "@/services/global-keys"

/* const handleLocation = () =>{
    console.log("localização aqui")
    const location = localStorage.getItem(global.location_storage_key);
    console.log("minha localização", location)
} */


export function AppRouter({ }){

    const context = useContext(globalContext) 
    const dispatch = useDispatch()
    var { user, god_mode, user_address } = useSelector((state:any)=>state.main) 

    useEffect(()=>{
      if(user){
        const addressStorage = user.company.addresses[0]
        if(addressStorage) dispatch(setUserAddress(addressStorage)) ;
      }else{
        const addressStorage: any = localStorage.getItem(global.location_storage_key);
        if(addressStorage) dispatch(setUserAddress(JSON.parse(addressStorage))) 
      }
    },[user])

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

