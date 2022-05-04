import React, { FC, useEffect, useState } from 'react'
import { Route } from "react-router-dom";
import { Redirect } from 'react-router-dom'

export namespace GuardRouter {
  export type Params = { component: FC,  path: string, location?: any | null, beforeEach?: Function }
}

const Guard: React.FunctionComponent<GuardRouter.Params> = (props) => {

  const {component: Component, path, beforeEach, location } = props;
  const [ redirectTo, SetRedirectTo ] = useState("");
  
  useEffect(()=>{ beforeRouterHandler() },[path])

  const beforeRouterHandler = async () => {
    var redirect = beforeEach && await beforeEach()
    if(redirect) SetRedirectTo(redirect);
  } 

  if(redirectTo != "") return(<Redirect to={redirectTo} ></Redirect>);
  return ( 
      <Route exact={true} path={path} render={ (props) => {return ( <Component {...props} > </Component>) 
      }} /> 
  )
}

export default Guard
