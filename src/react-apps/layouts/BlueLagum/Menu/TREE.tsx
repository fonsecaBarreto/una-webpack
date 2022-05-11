
import React from 'react'
import { AiFillShop, AiOutlinePlusSquare } from 'react-icons/ai'
import { MdBusiness } from 'react-icons/md'
import { GiNotebook } from 'react-icons/gi'
import { IoLogoWhatsapp } from 'react-icons/io'
import { UserProfileRole } from '@/domain/views/User'
import { RiProfileFill } from "react-icons/ri"

export const USER_TREE = (user: any) =>{

    if(!user) return [];
    const admins = [
        { label:"Cotações", toDo:"/admin/cotacoes", icon: <GiNotebook/>},
        { label:"Companhias", toDo:"/admin/companhias", icon: <MdBusiness/>},
        { label:"Registro", toDo:"/admin/registro", icon: <AiOutlinePlusSquare/>},
    ]
    const users = [
        { label:"Perfil",  toDo:`/perfil/companhias/${user.company_id}`, icon: <RiProfileFill/>},
    ]

    var result: any = []
    if(user.roles.includes(UserProfileRole.ADMIN)) result = [ ...result, ...admins];

    result = [ ...users, ...result]
    return result;
}

export const MENU_TREE = (user:any) => ([  
    {label:"Mercado", toDo:"/mercado", icon:<AiFillShop/>},
    ...USER_TREE(user),
    { className:"zap-green", label:"Whatsapp", toDo: () =>  window.open('https://wa.me/5522992317557', '_blank'), icon:<IoLogoWhatsapp/>}
])


export default MENU_TREE
 