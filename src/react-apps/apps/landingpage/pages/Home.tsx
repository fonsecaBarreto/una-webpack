import React, { useCallback, useEffect, useRef, useState } from "react"
import "./home.css"

const ROW_STRUCT = [
   {
       image:null,
       title: "O que fazemos?",
       description: "Conectamos fornecedores e compradores, reduzindo custos."
   },
   {
       image:null,
       title: "Oportunidades",
       description: "Desfrute das vantagens de fazer parte de um grupo que compra junto."
   },
   {
       image:null,
       title: "Publico alvo.",
       description: "Mercados, padarias e estabelecimentos que procuram melhorar suas compras"
   },
]


const items = [
   { icon:null, text: " A união de vários comércios possibilita aos membros da Una, comprar mais Barato."},
   { icon:null, text: "Isso é possível porque aumenta o volume de compras."},
   { icon:null, text: "Com um simples cadastro você tem acesso direto aos principais fornecedores."},
   { icon:null, text: "O uso da plataforma para cotação é livre de taxas. "},
   { icon:null, text: "Quem determina o produto a ser comprado, continua sendo você."},
   { icon:null, text: "Tenha suas cotações centralizadas em um sistema especializado, com histórico de preços e compras realizadas com diversos fornecedores."}
]


export const HomePage = () => {
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);
   }, []);

   return (
   <div>
      <div id="home-page">
         <div id="home">
            <h1>
             {isClient ? 'Is Client' : 'Is Server'} 
            </h1>
            <div id="head-line" >
                  <div className="app-container">
                     
                     <div className="head-line-text-container">
                        <h1> Una A praticidade de comprar ao melhor preço</h1>
                        <h3> Uma plataforma digital para empresários reduzirem custos, conectando o comprador ao fornecedor, simplificando o processo de compras. </h3>
                        <button className="soft-btn"> Saiba mais</button>
                     </div>
                  </div>
            </div>
         </div>


         <div  id="goals">
            <div className="app-container">
            <div className="perks-row">
               {
                  ROW_STRUCT.map( (col, i)=>(
                     <div className="perks-card" key={i}>
                           <div className="pcimg-vp">
                              {/* <img src={col.image ??}></img> */}
                           </div>
                           <span>{col.title}</span>
                           <span>{col.description}</span>
                     </div>
                  ))
               }
            </div>
            </div> 
         </div>


         <div className="main-content-right-side">
            <ul>
                { items.map((j,i)=> (  
                    <li key={i}>
                        <span> {j.icon} </span>
                        {j.text}
                    </li>  
                ))  }
            </ul>    
          
        </div>


      </div>
      
   </div>)
}


export default HomePage