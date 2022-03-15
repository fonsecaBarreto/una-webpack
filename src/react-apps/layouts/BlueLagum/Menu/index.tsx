import React from 'react'
import { IoIosArrowForward, IoIosArrowUp } from 'react-icons/io'
import MenuItem, { BlueLakeMenuItem } from './MenuItem'
import './style.css'

export namespace BlueLakeMenu {
    export type Params = {
        menuState: { show: boolean, toggle: Function }
        menuTree: any //BlueLakeMenuItem.Config[]
    }
}

export const ToggleButton: React.FunctionComponent<any>  = ({ onClick, positive }) => {
    return (
        <button className={`blue-lake-menu-toggle-button`} onClick={onClick && onClick}> {positive ? <IoIosArrowForward/> : <IoIosArrowUp/> }</button>
    )
}

const BlueLakeMenu: React.FunctionComponent<BlueLakeMenu.Params> = ({ menuState, menuTree }) =>{
    return (
        <div className={`blue-lake-menu ${menuState.show ? 'show' : ''}`}>
            <section className="blue-lake-menu-header">
                <ToggleButton onClick={menuState.toggle} positive={menuState.show}></ToggleButton>
            </section>
            <section>
                <ul> {      
                    menuTree.map((p:any,i:number) => ( <MenuItem selected={false} config={p} key={i} menuState={menuState}> </MenuItem>))
                } </ul> 
            </section> 
            <section>
               {/*  <UserComponent menuState={menuState} user={user}></UserComponent> */}
            </section> 
        </div>
    )
}
export default BlueLakeMenu