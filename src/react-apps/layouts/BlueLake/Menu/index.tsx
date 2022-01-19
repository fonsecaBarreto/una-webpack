import React from 'react'
import ToggleButton from '../../components/ToggleButton'
import MenuItem, { BlueLakeMenuItem } from './MenuItem'
import './style.css'

export namespace BlueLakeMenu {
    export type Params = {
        menuState: { show: boolean, toggle: Function }
        menuTree: BlueLakeMenuItem.Config[]
    }
}

const BlueLakeMenu: React.FunctionComponent<BlueLakeMenu.Params> = ({ menuState, menuTree }) =>{
    return (
    
        <div className={`blue-lake-menu ${menuState.show ? 'show' : ''}`}>
            <section className="blue-lake-menu-header">
                <ToggleButton onClick={menuState.toggle} desktop></ToggleButton>
            </section>
            <section>
                <ul> {      
                    menuTree.map((p,i) => ( <MenuItem selected={false} config={p} key={i} menuState={menuState}> </MenuItem>))
                } </ul> 
            </section> 
            <section>
               {/*  <UserComponent menuState={menuState} user={user}></UserComponent> */}
            </section> 
        </div>)
}


export default BlueLakeMenu