import React from "react"
import { AiFillDashboard } from 'react-icons/ai'
import { ImUsers } from 'react-icons/im'
export const MkItem = ( label, to, icon = null, childs=[]) =>{
    return ( { icon, to, label, childs } )
}

export const MENU_TREE = [
    MkItem("Painel", "/dashboard", <AiFillDashboard/>),
    MkItem("Produtos", "/produtos", <AiFillDashboard/>),
]