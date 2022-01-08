
import React, { useEffect, useState } from 'react'
import './style.css'

import LayoutHeader from './Header'
import LayoutFooter from './Footer' 


/* import { useSelector  } from 'react-redux' */

/* const MenuState = () =>{
    const [ show, setShow ] = useState(false)
    const toToggle = () => { setShow(!show)  }
    return { show, setShow, toToggle }
}
 */
/*     const { currentPage } = useSelector(state => state.global) */
/*    const menuState = MenuState() */
const PrimaryLayout:  React.FunctionComponent<any> = ({children}) =>{
    return (
        <div className="blue-lagum">

            <header>
                <LayoutHeader></LayoutHeader>
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
export default PrimaryLayout

