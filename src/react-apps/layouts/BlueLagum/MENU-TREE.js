
import React from 'react'
import { AiFillDashboard, AiFillShop } from 'react-icons/ai'
import { ImUsers, ImExit, ImProfile } from 'react-icons/im'
import { loginServices } from '@/services/api/login-service'
import { MdBusiness, MdProductionQuantityLimits } from 'react-icons/md'
import { BsPlusCircleDotted } from 'react-icons/bs'
import { FaClipboardList} from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

export const ADMIN_TREE = (user) => ([
     {label:"Companhias", toDo:"/companhias", icon:<MdBusiness/>},
     {label:"Mercado", toDo:"/mercado", icon:<AiFillShop/>},
     {label:"Perfil", toDo:`/perfil/${user.companhia_id}`, icon:<CgProfile/>},
     {label:"Publicar", toDo:"/registrar-produtos", icon:<BsPlusCircleDotted/>},
])

export const COMMON_TREE = [
    {label:"Minhas cotações", toDo:"/admin/companhias", icon:<MdBusiness/>},
]


    //{label:"Meus Produtos", toDo:()=>window.location.href="/", icon:<MdProductionQuantityLimits/>},
    //{label:"Minas Cotações", toDo:()=>window.location.href="/", icon:<FaClipboardList/>}, */
    //{label:"Perfil", toDo:()=>window.location.href="/", icon:<CgProfile/>},
    //{label:"Sair", toDo:loginServices.logout, icon:<ImExit/>}, */