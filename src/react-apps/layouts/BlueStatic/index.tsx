
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import './style.css'
import Header from './Header'
import LayoutFooter from '../BlueLagum/Footer'
export namespace BlueStaticLayoyt {
    export type Params ={
        children: ReactNode
    }
}

const BlueStaticLayoyt:  React.FunctionComponent<BlueStaticLayoyt.Params> = ({children }) =>{

    return (
        <div className={`static-blue-lagum`}>
          {/*   <AsideOverflowMenu user={user} context={menuContext}></AsideOverflowMenu> */}
            <header>
                <Header></Header>
            </header> 
            <main>
                {children}
            </main>
            <footer>
                <LayoutFooter></LayoutFooter>  
            </footer> 
        </div> 
    )
}
export default BlueStaticLayoyt

