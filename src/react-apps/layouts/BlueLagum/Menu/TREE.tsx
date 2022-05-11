
import React from 'react'
import BusinnesIcon from "@assets/icons/business.svg"
import AddIcon from "@assets/icons/add-register.svg"
import CartIcon from "@assets/icons/cart.svg"
import DocumentsFolder from "@assets/icons/documents-folder.svg"
import WhatsAppIcon from "@assets/icons/whatsapp.svg"
import ProfileIcon from "@assets/icons/profile.svg"
import { UserProfileRole } from '@/domain/views/User'

const svgStyle = {
    width: "18px",
    filter: "invert(5%) sepia(80%) saturate(5600%) hue-rotate(240deg) brightness(90%) contrast(150%)"
}

export const USER_TREE = (user: any) =>{

    if(!user) return [];

    const admins = [
         { 
            label:"Cotações", 
            toDo:"/admin/cotacoes",
            icon: <img src={DocumentsFolder} style={svgStyle}/>
        },

        { 
            label:"Companhias", 
            toDo:"/admin/companhias", 
            icon: <img src={BusinnesIcon} style={svgStyle}/>
        },

        { 
            label:"Registro", 
            toDo:"/admin/registro", 
            icon: <img src={AddIcon} style={svgStyle}/>
        }, 
    ]

    

    const users = [
        { 
            label:"Perfil",  toDo:`/perfil/companhias/${user.company_id}`,
            icon: <img src={ProfileIcon}style={svgStyle}></img>
        },
    ]

    var result: any = []
    if(user.roles.includes(UserProfileRole.ADMIN)) result = [ ...result, ...admins];

    result = [ ...users, ...result]
    return result;
}

export const MENU_TREE = (user:any) => ([  
    {
        label:"Mercado", 
        toDo:"/mercado", 
        icon:( <img src={CartIcon} style={svgStyle}/>)  
    },
    
    ...USER_TREE(user),
    {  
        label:"Whatsapp", 
        toDo: () =>  window.open('https://wa.me/5522992317557', '_blank'), 
        icon:( <img src={WhatsAppIcon} style={svgStyle}/>)  
    }
])


export default MENU_TREE
 