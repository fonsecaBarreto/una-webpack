import React from 'react'
import "./style.css"
import { BlueLakeMenu } from '..'
import { FaBars } from 'react-icons/fa'
import MenuItem from './Item'
import UserComponent from '../UserComponent'
import { useHistory } from 'react-router-dom'

export const AsideOverflowMenu = ({context, user}: { context: BlueLakeMenu.Result, user: any}) =>{


    const history = useHistory()

    const handleHeaderClick = () =>{
        if(!user) {
            history.push("/login?v=signup");
            context.toggleMenu();
        }
    }

    return (
    <div className={`blao-menu ${ context.show ? 'show' : ''}`}> 
        <header>
            <UserComponent user={user} onClick={handleHeaderClick}></UserComponent>
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


