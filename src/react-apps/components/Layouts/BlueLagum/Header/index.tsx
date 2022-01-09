
import React from 'react'
import './style.css'
import ToggleButton from '../ToggleButton'
import Logo from '@/public/assets/images/logo.svg' 
import { IoMdCart } from 'react-icons/io'
import { FaUserCircle } from "react-icons/fa"
import SearchBar from '../SearchBar'
import { useSelector, useDispatch} from 'react-redux'
import CarrinhoButton from './CarrinhoButton'

export namespace PrimaryHeader {
    export type Params = {
        toggleCart: () => void
    }
}

export const PrimaryHeader: React.FunctionComponent<PrimaryHeader.Params> =  ({toggleCart})=> {

    const { cart } = useSelector((state: any)=>state.carrinho)

    return (
    
        <header className="primary-header">
            <div className="primary-header-content app-container">

                <section>
                    <ToggleButton ></ToggleButton> 
                    <img className="bluelagum-logo" src={Logo}></img>  
                </section> 

                <section>
                    <SearchBar></SearchBar>
                </section>

                <section className='primary-header-content-option'>
                    <button ><FaUserCircle></FaUserCircle></button>
                    <CarrinhoButton onClick={toggleCart} count={cart?.length ?? 0}/>
                </section>

            </div> 
        </header> 
    )
}

export default PrimaryHeader