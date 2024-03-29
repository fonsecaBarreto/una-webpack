
import React from 'react'
import DocumentsFolder from "@assets/icons/documents-folder.svg"
import WhatsAppIcon from "@assets/icons/whatsapp.svg"
import { UserProfileRole } from '@/domain/views/User'
import HomeIcon from "@assets/icons/home.svg"
import ExitIcon from "@assets/icons/exit.svg"
import DocumentsIcons from "@assets/icons/cotacoes.svg"
import { loginServices } from '@/services/api/login-service'
import AdminIcon from "@assets/icons/admin.png"

const svgStyle = {
    width: "18px",
    filter: "invert(5%) sepia(80%) saturate(5600%) hue-rotate(240deg) brightness(90%) contrast(150%)"
}

export const ADMIN_TREE_MENU = (user: any) =>{

    if(!user || !user?.roles.includes(UserProfileRole.ADMIN)) return [];

    return[
        { 
           label:"Cotações", 
           toDo: () => window.location.href="https://app.unacompras.com.br/admin/budgets",
           icon: <img src={DocumentsFolder} style={svgStyle}/>
       },
       { 
           label:"Admin", 
           toDo: () => window.location.href="https://app.unacompras.com.br/admin",
           icon: <img src={AdminIcon} style={svgStyle}/>
       }
   ]
}

export const USER_TREE_MENU = (user: any) =>{
    if(!user) return [];
    return [
        {
            label:"Minhas Cotações", 
            toDo:"/cotacoes", 
            icon:( <img src={DocumentsIcons} style={svgStyle}/>)  
        },
        {
            label:"Sair", 
            toDo: () => loginServices.logout(),
            icon:( <img src={ExitIcon} style={svgStyle}/>)  
        },
    
    ]
}

export const PUBLIC_MENU_TREE = () => ([  
    {
        label:"Inicio", 
        toDo:"/mercado", 
        icon:( <img src={HomeIcon} style={svgStyle}/>)  
    },
    {  
        label:"Whatsapp", 
        toDo: () =>  window.open('https://wa.me/5522992317557', '_blank'), 
        icon:( <img src={WhatsAppIcon} style={svgStyle}/>)  
    },
])


 