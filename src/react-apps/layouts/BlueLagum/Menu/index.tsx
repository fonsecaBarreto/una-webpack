import React from 'react'
import MenuItem, { BlueLakeMenuItem } from './MenuItem'
import './style.css'
import LogoImg from '@/public/assets/images/logo-alt-dark.png' 
import { Link } from 'react-router-dom'
import { RiMenu5Fill } from 'react-icons/ri'
import { CgMenuLeft } from 'react-icons/cg'
import UserComponent from './UserComponent'
import MenuTree, { MenuItemConfig } from '../MENU-TREE'

export namespace BlueLakeMenu {
    export type Params = {
        menuState: { show: boolean, toggle: any }
        user: any
    }
}

const BlueLakeMenu: React.FunctionComponent<BlueLakeMenu.Params> = ({ menuState, user }) =>{
    return (
        <div className={`blue-lake-menu ${menuState.show ? 'show' : ''}`}>
            <section className="blue-lake-menu-header">
                <Link to="/" className='blue-lake-menu-header-logo'> <img src={LogoImg}></img>   </Link>
                <button className={`blue-lake-menu-toggle-button`} 
                    onClick={menuState.toggle}> { !menuState.show ? <RiMenu5Fill/> : <CgMenuLeft/> }
                </button>
            </section>
            <section>
                <ul> { 
                    MenuTree(user).map((p:any,i:number) => (
                     <MenuItem selected={false} 
                        config={p} key={i} menuState={menuState}> 
                     </MenuItem>))
                } </ul> 
            </section> 
            <section>
                { user && <UserComponent menuState={menuState} user={user}/>}
            </section> 
        </div>
    )
}
export default BlueLakeMenu