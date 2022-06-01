import React, { useState } from 'react'
import { ADMIN_TREE_MENU, PUBLIC_MENU_TREE, USER_TREE_MENU } from './TREE'

export namespace BlueLakeMenu {
    export type Item = {
        label: string, icon: any, toDo?: any,  className?:string, childs?: Item[]
    }
    export type Params = { user: any  }
    export type Result = { show: boolean, trees: any, toggleMenu: any }
}

export const BlueLakeMenuContext = ({ user }: BlueLakeMenu.Params): BlueLakeMenu.Result =>{
    const [ show, setShow ] = useState(false);
    const toggleMenu =  () => setShow(prev=>!prev)
    return { show, trees: [ PUBLIC_MENU_TREE(), USER_TREE_MENU(user), ADMIN_TREE_MENU(user)], toggleMenu }
}
