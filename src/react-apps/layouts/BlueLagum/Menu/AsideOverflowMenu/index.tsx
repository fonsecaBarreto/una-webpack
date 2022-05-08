import React from 'react'
import "./style.css"
import { BlueLakeMenu } from '..'
import { FaBars } from 'react-icons/fa'
import MenuItem from './Item'

export const AsideOverflowMenu = ({context}: { context: BlueLakeMenu.Result}) =>{
    return (
    <div className={`blao-menu ${ context.show ? 'show' : ''}`}> 
        <header>
            <button className={`blao-menu-toggle-button`} onClick={context.toggleMenu}> 
                <FaBars></FaBars>
            </button> 
        </header>
        <main>
            <nav>
                <ul>
                    { 
                        context.tree.map((p:any,i:number) => ( 
                            <MenuItem config={p} key={i}> </MenuItem>)
                        )
                    } 
                </ul> 
            </nav>
        </main>
        <footer> </footer> 
    </div>
    )
}

export default AsideOverflowMenu


