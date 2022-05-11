import React, { FunctionComponent } from 'react'
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
                        <Link className='dep-link' to="/mercado"> Todos departamentos</Link>
                    </DepartamentDropDown> 
                       <DepartamentDropDown>
                        <Link className='dep-link' to="/mercado/padaria">  Padaria </Link>
                    </DepartamentDropDown> 
                  
                    <DepartamentDropDown>
                        <Link className='dep-link' to="/mercado/mercado"> Mercado </Link>
                    </DepartamentDropDown>  
                </nav>
            </div>
        </header>
    )
}

export default DepartamentHeader