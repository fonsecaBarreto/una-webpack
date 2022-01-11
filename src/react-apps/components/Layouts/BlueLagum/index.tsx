
import React, { useContext, useEffect, useState } from 'react'
import './style.css'

import LayoutHeader from './Header'
import LayoutFooter from './Footer' 
import LayoutCart from './Cart'
import { useDispatch, useSelector } from 'react-redux'
import globalComponent from '@/react-apps/apps/main/global/global-components-context';
import { MakeDialogConfig } from 'fck-react-dialog'
import ForbiddenCartModal from '../../Modals/ForbiddenCart'

import { IoMdLogIn } from 'react-icons/io'
import { useHistory } from 'react-router-dom'

const PrimaryLayout:  React.FunctionComponent<any> = ({children}) =>{
    const history = useHistory()
    const Context: any = useContext(globalComponent);
    const { user } = useSelector((state: any)=>state.main)
    const [ showCart, setShowCart ] = useState(false)

    const openCart = () =>{

        if(!user){

            return Context.dialog.push( MakeDialogConfig(ForbiddenCartModal,
                (n)=>{
                    switch(n){
                        case 1: history.push("/login?v=singin");break;
                        case 2: history.push("/login?v=signup");break;
                    }
                    return -1;
                }, "UNA-SE AO JOGO DOS GRANDES"))

        }else{
            setShowCart(!showCart) 
        }
    }

    return (
        <div className="blue-lagum">
            <header>
                <LayoutHeader toggleCart={openCart} user={user}></LayoutHeader>
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

