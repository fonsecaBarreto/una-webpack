
import React, { useEffect, useState } from 'react'
import './style.css'

import LayoutHeader from './Header'
import LayoutFooter from './Footer' 
import LayoutCart from './Cart'


const PrimaryLayout:  React.FunctionComponent<any> = ({children}) =>{

    const [ showCart, setShowCart ] = useState(false)

    return (
        <div className="blue-lagum">

            <header>
                <LayoutHeader toggleCart={()=>setShowCart(!showCart)}></LayoutHeader>
            </header> 

             <main>
                {children}
            </main>
    
            <footer>
                <LayoutFooter></LayoutFooter>  
            </footer> 

            <LayoutCart show={showCart} onClose={()=>setShowCart(false)}></LayoutCart>
        </div>
    )
}
export default PrimaryLayout

