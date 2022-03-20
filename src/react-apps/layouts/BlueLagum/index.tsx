
import React, { Context, ReactNode, useContext, useEffect, useState } from 'react'
import './style.css'
import LayoutHeader from './Header'
import LayoutFooter from './Footer' 
import LayoutCart from './Cart'
import globalComponent from '@/react-apps/apps/main/global-components-context';
import { MakeDialogConfig } from 'fck-react-dialog'
import ForbiddenCartModal from '../../components/Modals/ForbiddenCart'

import { useHistory } from 'react-router-dom'
import Menu from './Menu'
import { RESULT_MENU_TREE } from './MENU-TREE'

const MenuState = () =>{
    const [ show, setShow ] = useState(false)
    const toggle = () => { setShow(!show)  }
    return { show, toggle}
}

export namespace BlueLagumLayout {
    export type Params ={
        children: ReactNode,
        menu?: boolean,
        user?: any,

    }
}

const PrimaryLayout:  React.FunctionComponent<BlueLagumLayout.Params> = ({children, user, menu}) =>{

    const menuState = MenuState()
    const history = useHistory()
    const Context: any = useContext(globalComponent);
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
        <div className={`blue-lagum ${menu ===true && user ? "bl-aside-menu" : ""}`}>

            { (menu ===true && user) && <aside><Menu menuState={menuState} menuTree={RESULT_MENU_TREE(user)} ></Menu></aside> }
            <header>
                <LayoutHeader toggleCart={openCart}></LayoutHeader>
            </header> 

            <main> {children} </main>

            <footer>
                <LayoutFooter></LayoutFooter>  
            </footer>  

            <LayoutCart show={showCart} onClose={()=>setShowCart(false)}></LayoutCart>

        </div>
    )
}
export default PrimaryLayout

