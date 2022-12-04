import React, { FunctionComponent } from 'react'
import ArrowImage from "@assets/icons/down-arrow.svg"
import { Link } from 'react-router-dom'
import './style.css'

export const DepartamentDropDown: FunctionComponent<any> = ({children}) => {
    return (
        <div className='departament-dropdown'>
            <span>
                {children}
            </span>
        </div>
    )
}

export const DepartamentHeader = () => {
    return (
        <header className='bl-departament-header'>
            <nav className='app-container'>
                <DepartamentDropDown>
                    <Link className='dep-link' to="/mercado"> Todos departamentos</Link>
                </DepartamentDropDown> 
                <DepartamentDropDown>
                    <Link className='dep-link' to="/mercado/padaria">  Padaria </Link>
                </DepartamentDropDown> 

                <DepartamentDropDown>
                    <Link className='dep-link' to="/mercado/mercado">  Mercado </Link>
                </DepartamentDropDown> 
                
                <DepartamentDropDown>
                    <Link className='dep-link' to="/mercado/confeitare"> Confeitare </Link>
                </DepartamentDropDown>  
                    
                <DepartamentDropDown>
                    <Link className='dep-link' to="/mercado/laticinios"> Laticínios </Link>
                </DepartamentDropDown>  
            </nav>
        </header>
    )
}

export default DepartamentHeader