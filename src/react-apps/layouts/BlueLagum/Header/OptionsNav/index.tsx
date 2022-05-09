import React, { useContext } from 'react'
import './style.css'
import UserButton from './UserButton'
import CarrinhoButton from './CarrinhoButton'
import SearchButton from './SearchButton'
/* global */
import { GlobalContext } from '@main/app';
/* Dialog helpers */
import { loginServices } from "@/services/api/login-service"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
//import { Usuario } from '@/domain/views/Usuario'
import DropDown from "@/react-apps/components/una/DropDown"
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import { setGodMode } from '@/react-apps/store/reducers/main/actions'
import { UserProfileRole } from '@/domain/views/User'

export const OptionsNav: React.FunctionComponent<any> = ({ toggleCart, toggleSearch }) =>{
    const context: any = useContext(GlobalContext);
    const dispatch = useDispatch()
    const history = useHistory()
    const { cart } = useSelector((state: any)=>state.carrinho)
    const { user } = useSelector((state: any)=>state.main)

    const handleGodMode = () => {
        context.dialog.push(MakeNotification((n)=>{
            if(n === 0){ dispatch(setGodMode(true))} return -1;
        },["Você está prestes a entrar no modo administrador", "tem certeza disso?"],"Atenção", NotificationType.CONFIRMATION))
    }

    var DROP_DOWN_OPTIONS: DropDown.Options[] = [];
    
    if(user){
        DROP_DOWN_OPTIONS = [ { label: "Sair", value: "SAIR" }];
        if(user.roles.includes(UserProfileRole.ADMIN)){
            DROP_DOWN_OPTIONS = [ ...DROP_DOWN_OPTIONS, { label:"SUPER USUARIO", value: "GOD_MODE"}]
        }
    }else{
        DROP_DOWN_OPTIONS = [ { label: "Entrar", value: "SIGNIN"}, { label: "Cadastrar-se", value : "SINGUP"}];
    }
    
    const handleOptions = (n:string) =>{
        switch(n){
            case "SAIR": loginServices.logout();break;
            case "GOD_MODE": handleGodMode(); break;
            case "SIGNIN": history.push("/login?v=signin");break;
            case "SINGUP": history.push("/login?v=signup");break;
        }
        return -1
    }

    return (
        <nav className='una-header-options-nav'>
            <SearchButton onClick={toggleSearch} className="mobile-only"/>
            <CarrinhoButton onClick={toggleCart} count={cart?.length ?? 0}/>
            <DropDown options={DROP_DOWN_OPTIONS} onAction={handleOptions} className="desktop-only">
                <UserButton user={user} onClick={() =>{}}></UserButton>
            </DropDown>
        </nav>
    )
}

export default OptionsNav



/*     const openProfileDialog = () => Context.dialog.push(MakeOptions((n:any)=>{ }, 
    user ? [ { label: "Perfil" }, { label: "Sair" }]
    : [ { label: "Entrar"}, { label: "Cadastrar-se"}], user ? user.nome :"Minha Conta")) */