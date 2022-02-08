import React, { useContext } from 'react'
import './style.css'
import { IoMdCart } from 'react-icons/io'
import UserButton from './UserButton'
import CarrinhoButton from './CarrinhoButton'
/* global */
import globalComponent from '@/react-apps/apps/main/global-components-context';
/* Dialog helpers */
import { loginServices } from "@/services/api/login-service"
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
//import { Usuario } from '@/domain/views/Usuario'
import DropDown from "@/react-apps/components/una/DropDown"

export const OptionsNav: React.FunctionComponent<any> = ({ toggleCart }) =>{
    const Context: any = useContext(globalComponent);
    const history = useHistory()
    const { cart } = useSelector((state: any)=>state.carrinho)
    const { user } = useSelector((state: any)=>state.main)

    var dropDownoptions: DropDown.Options[] = (
    user ? [  { label: "Sair", value: 3 } ]
    : [ { label: "Entrar", value: 0}, { label: "Cadastrar-se", value : 1}])
    
    const handleOptions = (n:number) =>{
        if(!user){
            switch(n){
                case 0:  history.push("/login?v=signin");break;
                case 1: history.push("/login?v=signup");break;
            }
        }else{
            switch(n){
                case 3: loginServices.logout();break;
            }
        }
        return -1
    }

    return (
        <nav className='una-header-options-nav'>
            <CarrinhoButton onClick={toggleCart} count={cart?.length ?? 0}/>
            <DropDown options={dropDownoptions} onAction={handleOptions}>
                <UserButton user={user} onClick={() =>{}}></UserButton>
            </DropDown>
        </nav>
    )
}

export default OptionsNav



/*     const openProfileDialog = () => Context.dialog.push(MakeOptions((n:any)=>{ }, 
    user ? [ { label: "Perfil" }, { label: "Sair" }]
    : [ { label: "Entrar"}, { label: "Cadastrar-se"}], user ? user.nome :"Minha Conta")) */