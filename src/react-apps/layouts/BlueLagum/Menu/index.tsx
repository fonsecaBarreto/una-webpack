import React from 'react'
import { IoIosArrowForward, IoIosArrowUp } from 'react-icons/io'
import MenuItem, { BlueLakeMenuItem } from './MenuItem'
import './style.css'
import LogoImg from '@/public/assets/images/logo-alt-dark.png' 
import { Link } from 'react-router-dom'
import { RiMenu4Line, RiMenu5Fill } from 'react-icons/ri'
import { CgMenuLeft } from 'react-icons/cg'
import UserComponent from './UserComponent'

export namespace BlueLakeMenu {
    export type Params = {
        menuState: { show: boolean, toggle: Function }
        menuTree: any, //BlueLakeMenuItem.Config[]
        user: any
    }
}

export const ToggleButton: React.FunctionComponent<any>  = ({ onClick, positive }) => {
    return (
        <button className={`blue-lake-menu-toggle-button`} onClick={onClick && onClick}> { !positive ? <RiMenu5Fill/> : <CgMenuLeft/> }</button>
    )
}

const BlueLakeMenu: React.FunctionComponent<BlueLakeMenu.Params> = ({ menuState, menuTree, user }) =>{
    return (
        <div className={`blue-lake-menu ${menuState.show ? 'show' : ''}`}>
            <section className="blue-lake-menu-header">
                <Link to="/" className='blue-lake-menu-header-logo'> <img src={LogoImg}></img>   </Link>
                <ToggleButton onClick={menuState.toggle} positive={menuState.show}></ToggleButton>
            </section>
            <section>
                <ul> {      
                    menuTree.map((p:any,i:number) => ( <MenuItem selected={false} config={p} key={i} menuState={menuState}> </MenuItem>))
                } </ul> 
            </section> 
            <section>
                { user && <UserComponent menuState={menuState} user={user}/>}
            </section> 
        </div>
    )
}
export default BlueLakeMenu