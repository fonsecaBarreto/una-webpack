
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import './style.css'
import BlueLakeHeader from './Header'
import BlueLakeMenu from './Menu'
import { BlueLakeMenuItem } from './Menu/MenuItem'

const MenuState = () =>{
    const [ show, setShow ] = useState(true)
    const toggle = () => { setShow(!show)  }
    return { show, toggle}
}

export namespace BlueLakeLayout {
    export type Params = {
        children: ReactNode,
        menuTree: BlueLakeMenuItem.Config[]
    }
}
const BlueLakeLayout:  React.FunctionComponent<BlueLakeLayout.Params> = ({children, menuTree}) =>{

    const menuState = MenuState()
    return (
        <div className="blue-lake">
            <header><BlueLakeHeader menuState={menuState}></BlueLakeHeader></header> 
            <aside> <BlueLakeMenu menuState={menuState} menuTree={menuTree}></BlueLakeMenu></aside> 
            <main> {children} </main>
        </div>
    )
}
export default BlueLakeLayout

