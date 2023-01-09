import React, { FunctionComponent } from 'react'
import BreadIcon from "@assets/icons/departaments/bread-icon.svg"
import CheeseIcon from "@assets/icons/departaments/cheese-icon.svg"
import basketIcon from "@assets/icons/departaments/shopping-basket-icon.svg"
import StackIcon from "@assets/icons/departaments/stack-icon.svg"
import WeddingCake from "@assets/icons/departaments/wedding-cake-icon.svg"

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
                    <Link className='dep-link' to="/mercado"> 
                        <img src={StackIcon} alt="Pilha de departamentos"/>
                        Todos departamentos
                    </Link>
                </DepartamentDropDown> 
                <DepartamentDropDown>
                    <Link className='dep-link' to="/mercado/padaria">  
                        <img src={BreadIcon} alt="pães" />
                        Padaria 
                    </Link>
                </DepartamentDropDown> 

               <DepartamentDropDown>
                    <Link className='dep-link' to="/mercado/bebidas">  
                    <img src={basketIcon} alt="garrafas"/>
                    Bebidas </Link>
                </DepartamentDropDown> 

                <DepartamentDropDown>
                    <Link className='dep-link' to="/mercado/congelados">  
                    <img src={basketIcon} alt="cesta de compras"/>
                    Congelados </Link>
                </DepartamentDropDown> 
                
                <DepartamentDropDown>
                    <Link className='dep-link' to="/mercado/confeitaria"> 
                    <img src={WeddingCake} alt="Bolo de casamento"/>
                    Confeitaria </Link>
                </DepartamentDropDown>  
                    
                <DepartamentDropDown>
                    <Link className='dep-link' to="/mercado/laticinios"> 
                    <img src={CheeseIcon} alt="queijos"/>
                    Laticínios </Link>
                </DepartamentDropDown>  
            </nav>
        </header>
    )
}

export default DepartamentHeader