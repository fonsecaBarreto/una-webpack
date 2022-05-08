
import React, { Context, ReactNode, useContext, useEffect, useState } from 'react'
import './style.css'
import LayoutHeader from './Header'
import LayoutFooter from './Footer' 
import LayoutCart from './Cart'
import globalComponent from '@/react-apps/apps/main/global-components-context';
import { MakeDialogConfig } from 'fck-react-dialog'
import ForbiddenCartModal from '../../components/Modals/ForbiddenCart'
import { useHistory } from 'react-router-dom'
import { BlueLakeMenuContext } from './Menu'
import GodModeNotify from './GodModeNotify'
import { useDispatch } from 'react-redux'
import { setGodMode } from '@/react-apps/store/reducers/main/actions'
import DepartamentHeader from './DepartamentsHeader'
import LocationBar from './LocationBar'
import AsideStaticMenu from './Menu/AsideStaticMenu'
import AsideOverflowMenu from './Menu/AsideOverflowMenu'

export namespace BlueLagumLayout {
    export type Params ={
        children: ReactNode,
        user?: any,
        god_mode?: boolean
    }
}

const PrimaryLayout:  React.FunctionComponent<BlueLagumLayout.Params> = ({children, user, god_mode}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const Context: any = useContext(globalComponent);
    const [ showCart, setShowCart ] = useState(false)
    const menuContext = BlueLakeMenuContext({user})

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
        <div className={`blue-lagum bl-aside-menu`}>

            {/* Menu */}
            <AsideOverflowMenu context={menuContext}></AsideOverflowMenu>
            <aside> <AsideStaticMenu context={menuContext}></AsideStaticMenu> </aside>
            <header>
                <LayoutHeader user={user} menuContext={menuContext} toggleCart={openCart}></LayoutHeader>
                <LocationBar></LocationBar>
            </header> 
            <main>
               {/*  <DepartamentHeader></DepartamentHeader> */}
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

