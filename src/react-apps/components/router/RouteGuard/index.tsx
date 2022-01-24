import React, { FC, useEffect, useState } from 'react'
import { Route } from "react-router-dom";
import { Redirect } from 'react-router-dom'

export namespace GuardRouter {
  export type Params = {
    component: FC,
    layout: FC,
    path: string,
    location: string | null,
    beforeRouter?: Function,
    layoutParams?: any
  }
}

const Guard: React.FunctionComponent<GuardRouter.Params> = ({component: PageComponent, layout: Layout, path, location, beforeRouter, layoutParams } ) => {

  const [ redirectTo, SetRedirectTo ] = useState("");
  useEffect(()=>{ beforeRouterHandler(); }, [ location ]) 

  const beforeRouterHandler = async () => {
    var redirect = beforeRouter && await beforeRouter()
    if(redirect) SetRedirectTo(redirect);
  } 

  return ( 
    <React.Fragment>
      { 
        redirectTo != "" ? <Redirect to={redirectTo} ></Redirect> : 
        <Route exact={true} path={path} render={ 
          (props) => { 
            return (<Layout {...layoutParams}> <PageComponent {...props} > </PageComponent> </Layout>) 
          }}  /> 
      }
    </React.Fragment>
  )
}

export default Guard
