
import React from 'react'
import { AiFillShop, AiOutlinePlusSquare } from 'react-icons/ai'
import { MdAdminPanelSettings, MdBusiness, MdPlusOne } from 'react-icons/md'
import { GiNotebook } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { IoLogoWhatsapp } from 'react-icons/io'
import { UserProfileRole } from '@/domain/views/User'
import { loginServices } from "@/services/api/login-service"
import { ImExit, ImProfile} from "react-icons/im"
import { FaUser } from "react-icons/fa"
import { RiProfileFill } from "react-icons/ri"

import { BsFillPlusSquareFill } from 'react-icons/bs'

export type MenuItemConfig = {
    label: string, 
    icon: any, 
    toDo?: any, 
    className?:string, 
    childs?: MenuItemConfig[]
}


export const USER_TREE = (user: any) =>{

    if(!user) return []
    const admins = [
        { label:"Cotações", toDo:"/cotacoes", icon: <GiNotebook/>},
        { label:"Companhias", toDo:"/companhias", icon: <MdBusiness/>},
        { label:"Registro", toDo:"/registro", icon: <AiOutlinePlusSquare/>},
    ]

    const users = [
        {label:"Perfil", icon:<ImProfile/>, childs: [
          /*   { label:"Usuario", toDo:`/perfil/usuarios/${user.id}`, icon: <FaUser/>}, */
            { label:"Companhia",  toDo:`/perfil/companhias/${user.company_id}`, icon: <RiProfileFill/>},
        ]},
    ]

    var result: MenuItemConfig[] = []
    if(user.roles.includes(UserProfileRole.ADMIN)) result = [ ...result, ...admins];

    result = [ ...users, ...result]

    return result;
}

export const PUBLIC_TREE = (user: any) => ([
    {label:"Mercado", toDo:"/mercado", icon:<AiFillShop/>}
])

export const RESULT_MENU_TREE = (user:any) => ([  
    ...PUBLIC_TREE(user), 
    ...USER_TREE(user),
    { className:"zap-green", label:"Whatsapp", toDo: () =>  window.open('https://wa.me/5522992317557', '_blank'), icon:<IoLogoWhatsapp/>}
])


export default RESULT_MENU_TREE
    //{label:"Meus Produtos", toDo:()=>window.location.href="/", icon:<MdProductionQuantityLimits/>},
    //{label:"Minas Cotações", toDo:()=>window.location.href="/", icon:<FaClipboardList/>}, */
