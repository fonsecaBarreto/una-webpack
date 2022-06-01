import React from 'react'
import "./style.css"
import { BlueLakeMenu } from '..'
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

    const { trees } = context

    const  [ publicMenu, UserMenu, adminMenu ] = trees;

    return (
    <div className={`blao-menu ${ context.show ? 'show' : ''}`}> 
        <aside>
            <header>
                <UserComponent user={user} onClick={handleHeaderClick}></UserComponent>
                <button className={`blao-menu-toggle-button`} onClick={context.toggleMenu}> 
                    &#x2715;
                </button> 
            </header>
            <main>
                <nav>

                    <ul>
                        { publicMenu.map((p:any,i:number) => ( <MenuItem onChange={context.toggleMenu} config={p} key={i}/>)) } 
                    </ul> 
                
                    { UserMenu.length > 0 && 
                        <ul>
                            { UserMenu.map((p:any,i:number) => ( <MenuItem onChange={context.toggleMenu} config={p} key={i}/>) ) } 
                        </ul>
                    }
                    
                    { adminMenu.length > 0 && 
                        <ul>
                            { adminMenu.map((p:any,i:number) => ( <MenuItem  onChange={context.toggleMenu} config={p} key={i}/>) ) } 
                        </ul>  
                    }
                </nav>
            </main>
            <footer></footer> 
        </aside>
    </div>
    )
}

export default AsideOverflowMenu


