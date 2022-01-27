import React from 'react'
import './style.css'
import GoalsImage from '@/public/assets/images/goals.svg'
import GroceryImage from '@/public/assets/images/groceries.svg'
import Tuck from '@/public/assets/images/headline-truck.svg'

const ROW_STRUCT = [
    {
        image:Tuck,
        title: "O que fazemos?",
        description: "Conectamos fornecedores e compradores, reduzindo custos."
    },
    {
        image:GoalsImage,
        title: "Oportunidades",
        description: "Desfrute das vantagens de fazer parte de um grupo que compra junto."
    },
    {
        image:GroceryImage,
        title: "Publico alvo.",
        description: "Mercados, padarias e estabelecimentos que procuram melhorar suas compras"
    },
]

export default () =>{
    return (
        <div className="perks-row">
            {
                ROW_STRUCT.map( (col, i)=>(
                    <div className="perks-card" key={i}>
                        <div className="pcimg-vp">
                            <img src={col.image}></img>
                        </div>
                        <span>{col.title}</span>
                        <span>{col.description}</span>
                    </div>
                ))
            }
        </div>
    )
}