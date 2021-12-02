import React from 'react'

const TesteComp  = () =>{
    return (
        <div> Componente teste </div>
    )
}

export const ROUTES =[
    { component: TesteComp, path: "/dashboard", title: "Painel Administrativo" },
    { component: TesteComp, path: "/pedidos", title: "Painel Administrativo" }
]

