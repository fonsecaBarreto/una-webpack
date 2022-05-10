
import React, { ReactNode, useContext, useState } from 'react'
import './style.css'
import LayoutHeader from './Header'
import LayoutFooter from './Footer' 
import LayoutCart from './Cart'
import { GlobalContext } from '@main/app';
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
import FloatAsideContent from './FloatAsideContent'

export namespace BlueLagumLayout {
    export type Params ={
        children: ReactNode,
        user?: any,
        god_mode?: boolean
    }
}

export const BlueLagumContext = React.createContext<any>({});

const FloatAsideContentHandler = ()=>{
    const [ content, setContent ] = useState(null)
    return ({content, setContent})
}

const BlueLagumLayout:  React.FunctionComponent<BlueLagumLayout.Params> = ({children, user, god_mode}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const context: any = useContext(GlobalContext);
    const [ showCart, setShowCart ] = useState(false)
    const menuContext = BlueLakeMenuContext({user})
    const asideFloat = FloatAsideContentHandler()

    const openCart = () =>{
        if(!user){
            return context.dialog.push( MakeDialogConfig(ForbiddenCartModal,
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
        <BlueLagumContext.Provider value={{ asideFloat }}>
            <div className={`blue-lagum bl-aside-menu`}>
                <GodModeNotify show={god_mode ?? false} exit={()=>{dispatch(setGodMode(false))}}></GodModeNotify>
                <LayoutCart show={showCart} onClose={()=>setShowCart(false)}></LayoutCart> 
                <AsideOverflowMenu user={user} context={menuContext}></AsideOverflowMenu>
                <FloatAsideContent show={asideFloat.content}> {asideFloat.content} </FloatAsideContent> 
                <aside> <AsideStaticMenu context={menuContext}></AsideStaticMenu> </aside>
                <header>
                    <LayoutHeader user={user} menuContext={menuContext} toggleCart={openCart}></LayoutHeader>
                    <LocationBar></LocationBar>
                </header> 
                <main>
                    {children}
                </main>
                <footer>
                    <LayoutFooter></LayoutFooter>  
                </footer> 
            </div>
        </BlueLagumContext.Provider>
    )
}
export default BlueLagumLayout

