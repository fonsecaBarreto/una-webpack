import React from 'react'


const TesteLayout  = ({children}) =>{
    return (
        <div> 
            Esse é meu layout
            {children}
        </div>
    )
}

const TesteComp  = () =>{
    return (
        <div> Componente teste </div>
    )
}

export const PAGES =[

    {
        layout: TesteLayout,
        prefix: "",
        routes: [
            { component: TesteComp, path: "/dashboard", title: "Painel Administrativo" },
            { component: TesteComp, path: "/dashboard", title: "Painel Administrativo" },
            { component: TesteComp, path: "/dashboard", title: "Painel Administrativo" },
        ]
    }

]

