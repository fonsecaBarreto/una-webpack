
import React from 'react'
import { AiFillShop, AiOutlinePlusSquare } from 'react-icons/ai'
import { MdBusiness } from 'react-icons/md'
import { GiNotebook } from 'react-icons/gi'
import { IoLogoWhatsapp } from 'react-icons/io'
import { UserProfileRole } from '@/domain/views/User'
import { ImProfile} from "react-icons/im"
import { RiProfileFill } from "react-icons/ri"

export const USER_TREE = (user: any) =>{

    if(!user) return [];

    const admins = [
        { label:"Cotações", toDo:"/cotacoes", icon: <GiNotebook/>},
        { label:"Companhias", toDo:"/companhias", icon: <MdBusiness/>},
        { label:"Registro", toDo:"/registro", icon: <AiOutlinePlusSquare/>},
    ]

    const users = [

        { label:"Perfil",  toDo:`/perfil/companhias/${user.company_id}`, icon: <RiProfileFill/>},


     /*    {label:"Perfil", icon:<ImProfile/>, childs: [
            { label:"Usuario", toDo:`/perfil/usuarios/${user.id}`, icon: <FaUser/>},
            { label:"Companhia",  toDo:`/perfil/companhias/${user.company_id}`, icon: <RiProfileFill/>},
        ]}, */
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
 