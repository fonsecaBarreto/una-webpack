import React, { FunctionComponent } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { MdBakeryDining } from 'react-icons/md'
import { RiShoppingBasketLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import './style.css'

export const DepartamentDropDown: FunctionComponent<any> = ({children}) => {
    return (
        <div className='departament-dropdown'>
            {children}
        </div>
    )
}

export const DepartamentHeader = () => {
    return (
        <header className='bl-departament-header'>
            <div className='app-container'>
                <nav>
                    <DepartamentDropDown>
                        <Link className='dep-link' to="/mercado">
                            <IoMdArrowDropdown/>
                            Todos departamentos</Link>
                    </DepartamentDropDown> 
                       <DepartamentDropDown>
                        <Link className='dep-link' to="/mercado/padaria"> 
                            <MdBakeryDining></MdBakeryDining>Padaria </Link>
                    </DepartamentDropDown> 
                  
                    <DepartamentDropDown>
                        <Link className='dep-link' to="/mercado/mercado"> <RiShoppingBasketLine/> Mercado </Link>
                    </DepartamentDropDown>  
                </nav>
            </div>
        </header>
    )
}

export default DepartamentHeader