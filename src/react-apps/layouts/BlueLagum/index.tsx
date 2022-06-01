
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import './style.css'
import LayoutHeader from './Header'
import LayoutFooter from './Footer' 
import LayoutCart from './Cart'
import { GlobalContext } from "@/react-apps/apps/GlobalContext";
import { MakeDialogConfig } from 'fck-react-dialog'
import ForbiddenCartModal from '../../components/Modals/ForbiddenCart'
import { useHistory } from 'react-router-dom'
import { BlueLakeMenuContext } from './Menu'
import GodModeNotify from './GodModeNotify'
import { useDispatch, useSelector } from 'react-redux'
import { setGodMode } from '@/react-apps/store/reducers/main/actions'
import DepartamentHeader from './DepartamentsHeader'
import LocationBar from './LocationBar'
import AsideStaticMenu from './Menu/AsideStaticMenu'
import AsideOverflowMenu from './Menu/AsideOverflowMenu'
import FloatAsideContent from './FloatAsideContent'

export namespace BlueLagumLayout {
    export type Params ={
        children: ReactNode
    }
}

export const BlueLagumContext = React.createContext<any>({});

const FloatAsideContentHandler = ()=>{
    const [ content, setContent ] = useState(null)
    return ({content, setContent})
}

const BlueLagumLayout:  React.FunctionComponent<BlueLagumLayout.Params> = ({children }) =>{
    const dispatch = useDispatch()
    const { user, god_mode } = useSelector((state: any)=>state.main)
    const history = useHistory()
    const context: any = useContext(GlobalContext);
    const [ showCart, setShowCart ] = useState(false)
    const menuContext = BlueLakeMenuContext({user})
    const asideFloat = FloatAsideContentHandler()

    useEffect(()=>{ console.log("renderizando o layout")},[])

    const handleHeaderChange = (key: string) =>{

        if(!user){
            return context.dialog.push( MakeDialogConfig(ForbiddenCartModal,
                (n)=>{
                    switch(n){
                        case 1: history.push("/login?v=singin"); break;
                        case 2: history.push("/login?v=signup"); break;
                    }
                    return -1;
                }, "Cadastre-se Gratuitamente!"))
        }

        switch(key){
            case "BUDGETS" : history.push("/cotacoes"); break; 
            case "CART": setShowCart(!showCart); break;      
        }
    }

    return (
        <BlueLagumContext.Provider value={{ asideFloat }}>
            <div className={`blue-lagum ${""}`}>
                <GodModeNotify show={god_mode ?? false} exit={()=>{dispatch(setGodMode(false))}}></GodModeNotify>
                <LayoutCart show={showCart} onClose={()=>setShowCart(false)}></LayoutCart> 
                <AsideOverflowMenu user={user} context={menuContext}></AsideOverflowMenu>
                <FloatAsideContent show={asideFloat.content}> {asideFloat.content} </FloatAsideContent> 
              {/*   <aside> <AsideStaticMenu context={menuContext}></AsideStaticMenu> </aside> */}
                <header>
                    <LayoutHeader menuContext={menuContext} onChange={handleHeaderChange}></LayoutHeader>
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

