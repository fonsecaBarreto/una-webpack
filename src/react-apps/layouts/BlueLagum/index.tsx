
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
import GodModeNotify from './GodModeNotify'
import { useDispatch } from 'react-redux'
import { setGodMode } from '@/react-apps/store/reducers/main/actions'
import DepartamentHeader from './DepartamentsHeader'

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
        god_mode?: boolean
    }
}

const PrimaryLayout:  React.FunctionComponent<BlueLagumLayout.Params> = ({children, user, menu, god_mode}) =>{

    const dispatch = useDispatch()
    const menuState = MenuState()
    const history = useHistory()
    const Context: any = useContext(globalComponent);
    const [ showCart, setShowCart ] = useState(false)

    const openCart = () =>{
        if(!user){
            return Context.dialog.push( MakeDialogConfig(ForbiddenCartModal,
                (n)=>{
                    switch(n){
                        case 1: history.push("/login?v=singin"); break;
                        case 2: history.push("/login?v=signup"); break;
                    }
                    return -1;
                }, "UNA-SE AO JOGO DOS GRANDES"))
        }else{
            setShowCart(!showCart) 
        } 
    }

    return (
        <div className={`blue-lagum ${ (menu ===true) ? "bl-aside-menu" : ""}`}>

            { (menu ===true ) && <aside> <Menu user={user} menuState={menuState} ></Menu> </aside> }
            
            <header>
                <LayoutHeader user={user} menuState={menuState} toggleCart={openCart}></LayoutHeader>
            </header> 
            <main>
                <DepartamentHeader></DepartamentHeader>
               {children}
            </main>
            <footer>
                <LayoutFooter></LayoutFooter>  
            </footer> 
            
            <GodModeNotify show={god_mode ?? false} exit={()=>{dispatch(setGodMode(false))}}></GodModeNotify>
            <LayoutCart show={showCart} onClose={()=>setShowCart(false)}></LayoutCart> 

        </div>
    )
}
export default PrimaryLayout

