import React, { useContext, useEffect, useRef, useState } from 'react'
import MENUTREE from './TREE'


export namespace BlueLakeMenu {
    export type Item = {
        label: string, icon: any, toDo?: any,  className?:string, childs?: Item[]
    }
    export type Params = { user: any  }
    export type Result = { show: boolean, tree: any, toggleMenu: any }
}

export const BlueLakeMenuContext = ({ user }: BlueLakeMenu.Params): BlueLakeMenu.Result =>{
    const [ show, setShow ] = useState(false);
    const toggleMenu =  () => setShow(prev=>!prev)
    return { show, tree: MENUTREE(user), toggleMenu }
}
