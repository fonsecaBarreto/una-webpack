import React from 'react'
import './style.css'
import GoalsImage from './goals.svg'
import GroceryImage from './groceries.svg'
import Tuck from './headline-truck.svg'

const ROW_STRUCT = [
    {
        image:Tuck,
        title: "O que fazemos?",
        description: "Conectamos fornecedores e compradores, reduzindo custos."
    },
    {
        image:GoalsImage,
        title: "Oportunidades",
        description: "Faça parte de um grupo que compra conjunta."
    },
    {
        image:GroceryImage,
        title: "Publico alvo.",
        description: "Estabelecimentos que procuram melhorar suas compras"
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

                        <span className='coltitle'>{col.title}</span>
                        <span className='coldescription'>{col.description}</span>
                    </div>
                ))
            }
        </div>
    )
}