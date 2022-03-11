
import React from 'react'
import { AiFillShop } from 'react-icons/ai'
import { MdBusiness } from 'react-icons/md'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { GiNotebook } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { UserProfileRole } from '@/domain/views/User'



export const ADMIN_TREE = (user) =>{
    if( !user.roles.includes(UserProfileRole.ADMIN) ) return []
    return ([
        {label:"Cotações", toDo:"/cotacoes", icon:<GiNotebook/>},
        {label:"Companhias", toDo:"/companhias", icon:<MdBusiness/>},
        {label:"Publicar", toDo:"/registrar-produtos", icon:<BsPlusCircleDotted/>},
    ])
}

export const COMMON_TREE = (user) => ([
    {label:"Mercado", toDo:"/mercado", icon:<AiFillShop/>},
    {label:"Perfil", toDo:`/perfil/${user.company_id}`, icon:<CgProfile/>},
])

export const RESULT_MENU_TREE = (user) => ([
    ...COMMON_TREE(user), ...ADMIN_TREE(user)
])



    //{label:"Meus Produtos", toDo:()=>window.location.href="/", icon:<MdProductionQuantityLimits/>},
    //{label:"Minas Cotações", toDo:()=>window.location.href="/", icon:<FaClipboardList/>}, */
    //{label:"Perfil", toDo:()=>window.location.href="/", icon:<CgProfile/>},
    //{label:"Sair", toDo:loginServices.logout, icon:<ImExit/>}, */