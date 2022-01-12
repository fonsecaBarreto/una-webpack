import React, { Component, FC, ReactNode, useEffect, useState } from 'react'
import { Route } from "react-router-dom";
import { loginServices } from '@/react-apps/services/login-service'

import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { setUser, setLoading } from '@/react-apps/store/reducers/main/actions' 

export namespace GuardRouter {
  export type Params = {
    component: FC,
    layout: FC,
    path: string,
    location: string
  }
}

const Guard: React.FunctionComponent<GuardRouter.Params> = ({component: PageComponent, layout: Layout, path, location, ...rest } ) => {

  const dispatch = useDispatch()
  var { user }  = useSelector((state:any)=>state.main) 
  const [ redirectTo, SetRedirectTo ] = useState("");

  const verifyUser = async () =>{
    console.log("** Trocando de rota ...")
    console.log("Verificando usuario")
    if(!user){ 
      dispatch(setLoading(true));
      try{
        const user = await loginServices.verify()
        dispatch(setUser(user));
      }catch(err){
        console.log("Nenhum usuario encontrado")
        //SetRedirect(`/login?e=${err.message}`)
      }finally{
        dispatch(setLoading(false));
      }
    }
  }

  useEffect(()=>{ beforeRouter(); }, [ location ]) 

  const beforeRouter = async () => {
    window.scroll({ top: 0, left: 0, behavior: 'auto' }); 
    verifyUser(); 
  } 


  return ( 
    <React.Fragment>
      { 
        redirectTo != "" ? <Redirect to={redirectTo} ></Redirect> : 
        <Route exact={true} path={path} render={ 
          (props) => { 
            return (<Layout > <PageComponent {...props} > </PageComponent> </Layout>) 
          }}  /> 
      }
    </React.Fragment>
  )
}

export default Guard
