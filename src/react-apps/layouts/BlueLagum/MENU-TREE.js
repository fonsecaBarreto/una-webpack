
import React from 'react'
import { AiFillDashboard, AiFillShop } from 'react-icons/ai'
import { ImUsers, ImExit, ImProfile } from 'react-icons/im'
import { loginServices } from '@/services/api/login-service'
import { MdBusiness, MdProductionQuantityLimits } from 'react-icons/md'
import { FaClipboardList} from 'react-icons/fa'

export const ADMIN_TREE = [
     {label:"Companhias", toDo:"/admin/companhias", icon:<MdBusiness/>},
     {label:"Mercado", toDo:()=>window.location.href="/", icon:<AiFillShop/>},
     {label:"Meus Produtos", toDo:()=>window.location.href="/", icon:<MdProductionQuantityLimits/>},
     {label:"Minas Cotações", toDo:()=>window.location.href="/", icon:<FaClipboardList/>},
     {label:"Perfil", toDo:()=>window.location.href="/", icon:<ImProfile/>},
     {label:"Sair", toDo:loginServices.logout, icon:<ImExit/>},
]

export const COMMON_TREE = [
    {label:"Minhas cotações", toDo:"/admin/companhias", icon:<MdBusiness/>},
]