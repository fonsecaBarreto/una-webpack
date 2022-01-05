
import React, { useEffect, useState } from 'react'
import './style.css'

import AppHeader from './Header'
 
/* import { useSelector  } from 'react-redux' */

/* const MenuState = () =>{
    const [ show, setShow ] = useState(false)
    const toToggle = () => { setShow(!show)  }
    return { show, setShow, toToggle }
}
 */
const PrimaryLayout:  React.FunctionComponent<any> = ({children}) =>{
/*     const { currentPage } = useSelector(state => state.global) */
/*    const menuState = MenuState() */
    return (
        <div className="blue-lagum">
            <h1> Eu sou o blue lagim layout </h1>

            <header>
                 <AppHeader ></AppHeader> 
            </header> 

            <main>
                {children}
            {/*     { JSON.stringify(menuTree)}
                { menuState.show? "Show" : "No"} */}
               {/*  {children} */}
            </main>
            
        </div>
    )
}
export default PrimaryLayout

