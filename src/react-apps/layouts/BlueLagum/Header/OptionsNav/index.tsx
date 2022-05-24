import React, { useContext } from 'react'
import './style.css'
import CarrinhoButton from './CarrinhoButton'
import SearchButton from './SearchButton'
import UserDropDown from './UserDropDown'
import { useSelector } from 'react-redux'

export const OptionsNav: React.FunctionComponent<any> = ({ toggleCart, toggleSearch }) =>{

    const { cart } = useSelector((state: any)=>state.carrinho)
    return (
        <nav className='una-header-options-nav'>
            <SearchButton onClick={toggleSearch} className="mobile-only"/>
            <CarrinhoButton onClick={toggleCart} count={cart?.length ?? 0}/>
            <UserDropDown></UserDropDown>
        </nav>
    )
}

export default OptionsNav