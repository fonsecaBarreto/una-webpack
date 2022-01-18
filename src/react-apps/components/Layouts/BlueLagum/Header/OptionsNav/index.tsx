import React, { useContext } from 'react'
import './style.css'
import { IoMdCart } from 'react-icons/io'
import UserButton from './UserButton'
import CarrinhoButton from './CarrinhoButton'
/* global */
import globalComponent from '@/react-apps/apps/main/global/global-components-context';
/* Dialog helpers */
import {  MakeOptions } from 'fck-react-dialog';
import { loginServices } from "@/services/login-service"
import { useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
//import { Usuario } from '@/domain/views/Usuario'
import DropDown from "@/react-apps/components/una/DropDown"
export const OptionsNav: React.FunctionComponent<any> = ({ toggleCart }) =>{
    const Context: any = useContext(globalComponent);
    const history = useHistory()
    const { cart } = useSelector((state: any)=>state.carrinho)
    const { user } = useSelector((state: any)=>state.main)

/*     const openProfileDialog = () => Context.dialog.push(MakeOptions((n:any)=>{
       
    }, 
    user ? [ { label: "Perfil" }, { label: "Sair" }]
    : [ { label: "Entrar"}, { label: "Cadastrar-se"}], user ? user.nome :"Minha Conta")) */

    var dropDownoptions: DropDown.Options[] =   user ? [ { label: "Perfil", value: 0 }, { label: "Sair", value: 1 }]
    : [ { label: "Entrar", value: 0}, { label: "Cadastrar-se", value : 1}]
    
    const handleOptions = (n:number) =>{
        if(!user){
            switch(n){
                case 0:  history.push("/login?v=signin");break;
                case 1: history.push("/login?v=signup");break;
            }
        }else{
            switch(n){
                case 0: history.push("/perfil");break;
                case 1: loginServices.logout();break;
            }
        }
        return -1
    }

    return (
        <nav className='una-header-options-nav'>
            <DropDown options={dropDownoptions} onAction={handleOptions}>
                <UserButton onClick={() =>{}}></UserButton>
            </DropDown>
            <CarrinhoButton onClick={toggleCart} count={cart?.length ?? 0}/>
        </nav>
    )
}

export default OptionsNav