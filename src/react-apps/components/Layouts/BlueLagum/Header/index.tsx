
import React, { useContext } from 'react'
import './style.css'
import ToggleButton from '../ToggleButton'
import Logo from '@/public/assets/images/logo.svg' 
import { IoMdCart } from 'react-icons/io'
import { FaUserCircle } from "react-icons/fa"
import SearchBar from '../SearchBar'
import { useSelector, useDispatch} from 'react-redux'
import CarrinhoButton from './CarrinhoButton'
import { Link } from 'react-router-dom'
/* global */
import globalComponent from '@/react-apps/apps/main/global/global-components-context';
/* Dialog helpers */
import {  MakeOptions } from 'fck-react-dialog';

export namespace PrimaryHeader {
    export type Params = {
        toggleCart: () => void
    }
}

import { useHistory } from 'react-router-dom'

export const PrimaryHeader: React.FunctionComponent<PrimaryHeader.Params> =  ({toggleCart})=> {

    const Context: any = useContext(globalComponent);
    const history = useHistory()

    const openProfileDialog = () => Context.dialog.push(MakeOptions((n:any)=>{
        switch(n){
            case 0:
                history.push("/login?v=signin")
                return -1; // Para Fechar o Modal
            case 1:
                history.push("/login?v=signup")
                return -1; // Para Fechar o Modal
         
            default:
                return -1
        }
    }, [ { label: "Entrar"}, { label: "Cadastrar-se"}], "Minha Conta"))

    const { cart } = useSelector((state: any)=>state.carrinho)

    return (
    
        <header className="primary-header">
            <div className="primary-header-content app-container">

                <section>
                    <ToggleButton ></ToggleButton> 
                    <Link to="/">
                        <img className="bluelagum-logo" src={Logo}></img>  
                    </Link>
                </section> 

                <section>
                    <SearchBar></SearchBar>
                </section>

                <section className='primary-header-content-option'>
                    <button className='header-a-btn' onClick={openProfileDialog} ><FaUserCircle></FaUserCircle></button>
                    <CarrinhoButton onClick={toggleCart} count={cart?.length ?? 0}/>
                </section>

            </div> 
        </header> 
    )
}

export default PrimaryHeader
