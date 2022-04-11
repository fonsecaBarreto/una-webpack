import React, { FunctionComponent } from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Link } from 'react-router-dom'
import './style.css'

export const DepartamentDropDown: FunctionComponent<any> = ({children}) => {
    return (
        <div className='departament-dropdown'>
            <div>
                <IoMdArrowDropdown/> {children}
            </div>
        </div>
    )
}

export const DepartamentHeader = () => {
    return (
        <header className='bl-departament-header'>
            <div className='app-container'>
                <nav>
                    <DepartamentDropDown>
                        <Link className='dep-link' to="/mercado">Todos departamentos</Link>
                    </DepartamentDropDown> 
                    <DepartamentDropDown>
                        <Link className='dep-link' to="/mercado/padaria"> Padaria </Link>
                    </DepartamentDropDown> 
                    <DepartamentDropDown>
                        <Link className='dep-link' to="/mercado/hortifruti"> Hortifruti </Link>
                    </DepartamentDropDown> 
                    <DepartamentDropDown>
                        <Link className='dep-link' to="/mercado/mercearia"> Mercearia </Link>
                    </DepartamentDropDown> 
                </nav>
            </div>
        </header>
    )
}

export default DepartamentHeader