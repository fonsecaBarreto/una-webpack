
import React, { useEffect, useState } from 'react'
import './style.css'
import AppHeader from './PrimaryHeader'
import AppMenu from './PrimaryMenu'

import { useSelector  } from 'react-redux'

const MenuState = () =>{
    const [ show, setShow ] = useState(false)
    const toToggle = () => { setShow(!show)  }
    return { show, setShow, toToggle }
}

const PrimaryLayout = ({ children, menuTree }) =>{
/*     const { currentPage } = useSelector(state => state.global) */
   const menuState = MenuState()
    return (
        <div className="blue-lagum">


    
            <aside>
                <AppMenu menuState={menuState} tree={menuTree} > </AppMenu>
            </aside>

            <header>
                <AppHeader menuState={menuState} ></AppHeader> 
            </header>

            <main>
                { JSON.stringify(menuTree)}
                { menuState.show? "Show" : "No"}
               {/*  {children} */}
            </main>
            
          

          {/*   <div> Menu aqui </div>
           */}


        
     {/*         */}

            {/*
             */}

        

        </div>
    )
}
export default PrimaryLayout

