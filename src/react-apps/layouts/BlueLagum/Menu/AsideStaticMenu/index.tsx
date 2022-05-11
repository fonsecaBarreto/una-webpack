import React from 'react'
import "./style.css"
import { BlueLakeMenu } from '..'
import { useHistory } from 'react-router-dom'

const MenuItem: React.FunctionComponent<any> = ({ icon, toDo, onClick }) =>{

    return (
    <li onClick={onClick} className={`blue-lake-aside-static-menu-item`} > 
        <span> { icon && icon } </span>
    </li>)
}

export const AsideStaticMenu = ({context}: { context: BlueLakeMenu.Result}) =>{

    const history = useHistory();

    const handleClick = (toDo: any) => { 
        if(typeof toDo == "string") return history.push(toDo);
        return toDo()
    } 

    return (
    <div className='blue-lake-aside-static-menu'> 
        <header>
        </header>
            <main>
                <nav>
                    <ul>
                        { 
                            context.tree.map((p:any,i:number) => ( 
                                <MenuItem icon={p.icon} onClick={() =>handleClick(p.toDo)} key={i}> </MenuItem>)
                            )
                        } 
                    </ul> 
                </nav> 
            </main>
        <footer>
            <button onClick={context.toggleMenu}>
                <span>&laquo;</span>
            </button>
        </footer> 
    </div>
    )
}

export default AsideStaticMenu


