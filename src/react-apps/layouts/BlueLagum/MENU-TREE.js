
import React from 'react'
import { AiFillDashboard, AiFillShop } from 'react-icons/ai'
import { ImUsers, ImExit } from 'react-icons/im'
import { loginServices } from '@/services/api/login-service'
import { MdBusiness } from 'react-icons/md'

export const ADMIN_TREE = [
    /*  {label:"Dashboard", toDo:"/admin/dashboard", icon:<AiFillDashboard/>}, */
     {label:"Companhias", toDo:"/admin/companhias", icon:<MdBusiness/>},
     {label:"Mercado", toDo:()=>window.location.href="/", icon:<AiFillShop/>},
     {label:"Sair", toDo:loginServices.logout, icon:<ImExit/>},
]

