
import React from 'react'
import { AiFillShop } from 'react-icons/ai'
import { MdBusiness } from 'react-icons/md'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { GiNotebook } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { IoLogoWhatsapp } from 'react-icons/io'
import { UserProfileRole } from '@/domain/views/User'
import { loginServices } from "@/services/api/login-service"
import { ImExit } from "react-icons/im"

export const USER_TREE = (user) =>{

    if(!user) return []
    const admins = [
        {label:"Cotações", toDo:"/cotacoes", icon:<GiNotebook/>},
        {label:"Companhias", toDo:"/companhias", icon:<MdBusiness/>},
         //{label:"Publicar", toDo:"/registrar-produtos", icon:<BsPlusCircleDotted/>},
    ]

    const users = [
        {label:"Perfil", toDo:`/perfil/${user.company_id}`, icon:<CgProfile/>},
        {label:"Sair", toDo:loginServices.logout, icon:<ImExit/>}
    ]

 
    if(user.roles.includes(UserProfileRole.ADMIN)) result = [ ...result, ...admins];

    var result = [ ...result, ...users]

    return result;
}

export const PUBLIC_TREE = (user) => ([
    {label:"Mercado", toDo:"/mercado", icon:<AiFillShop/>},
    {label:"Whatsapp", toDo: () =>  window.open('https://wa.me/5522992317557', '_blank'), icon:<IoLogoWhatsapp/>}
])



export const RESULT_MENU_TREE = (user) => ([  ...PUBLIC_TREE(user), ...USER_TREE(user),])



    //{label:"Meus Produtos", toDo:()=>window.location.href="/", icon:<MdProductionQuantityLimits/>},
    //{label:"Minas Cotações", toDo:()=>window.location.href="/", icon:<FaClipboardList/>}, */
