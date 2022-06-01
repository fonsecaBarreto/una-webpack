import React, { useContext } from 'react'
import './style.css'
import CarrinhoButton from './CarrinhoButton'
import PedidosButton from './PedidosButton'
import SearchButton from './SearchButton'
import UserDropDown from './UserDropDown'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export const OptionsNav: React.FunctionComponent<any> = ({ toggleCart, toggleSearch, toggleMenu, openBudgets }) =>{
    const history = useHistory()
    const { cart } = useSelector((state: any)=>state.carrinho)
    return (
        <nav className='una-header-options-nav'>
            <SearchButton onClick={toggleSearch} className="mobile-only"/>
            <CarrinhoButton onClick={toggleCart} count={cart?.length ?? 0}/>
            <PedidosButton  className="desktop-only" onClick={openBudgets}/>
            <UserDropDown onChange={()=>toggleMenu()}></UserDropDown>
        </nav>
    )
}

export default OptionsNav