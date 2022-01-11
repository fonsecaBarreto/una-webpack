
import React, { useEffect, useState } from 'react'
import './style.css'

import LayoutHeader from './Header'
import LayoutFooter from './Footer' 
import LayoutCart from './Cart'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/react-apps/store/reducers/main/actions'


const PrimaryLayout:  React.FunctionComponent<any> = ({children}) =>{
    const { user } = useSelector((state: any)=>state.main)
    const [ showCart, setShowCart ] = useState(false)

    return (
        <div className="blue-lagum">
            <header>
                <LayoutHeader toggleCart={()=>setShowCart(!showCart)} user={user}></LayoutHeader>
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

