import React from "react"
import { AiFillDashboard } from 'react-icons/ai'
import { ImUsers } from 'react-icons/im'
export const MkItem = ( label, to, icon = null, childs=[]) =>{
    return ( { icon, to, label, childs } )
}

export const MENU_TREE = [
    MkItem("Inicio", "/dashboard", <AiFillDashboard/>),
    MkItem("Produtos", "/dashboard", <AiFillDashboard/>),
    MkItem("Usuarios", "/users", <ImUsers></ImUsers>),
]