import React from 'react'
import "./style.css"
import { BlueLakeMenu } from '..'
import { BiArrowToTop } from 'react-icons/bi'

const MenuItem: React.FunctionComponent<any> = ({ icon, onHover }) =>{
    return (
    <li onMouseEnter={onHover} className={`blue-lake-aside-static-menu-item`} > 
        <span> {icon && icon}  </span>
    </li>)
}

export const AsideStaticMenu = ({context}: { context: BlueLakeMenu.Result}) =>{
    const handleChange = () =>{
        /* context.toggleMenu() */
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
                                <MenuItem icon={p.icon} onHover={handleChange} key={i}> </MenuItem>)
                            )
                        } 
                    </ul> 
                </nav> 
            </main>
        <footer>
            <button onClick={context.toggleMenu}>
                <BiArrowToTop/>
            </button>
        </footer> 
    </div>
    )
}

export default AsideStaticMenu


