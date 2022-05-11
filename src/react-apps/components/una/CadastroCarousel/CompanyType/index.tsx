import React, { useEffect, useState } from 'react'
import "./style.css"
export const CompanyTypeSelector:React.FunctionComponent<any>=  ({onChange}) =>{
    const [ selected, setSelected ] = useState(0)
    useEffect(()=>{
        onChange(selected)
    },[selected])
    return (
        <div className='una-company-type-selector'>

            <span>
                A UNA COMPRAS tem o proposito de facilitar a venda B2B.<br></br>
                A princípio, você pretender comprar ou vender em nosso marketplace?
            </span>

            <button onClick={()=>setSelected(0)} className={`${selected ==0 ? "cts-selected": ""}`}> Quero Comprar!</button>
            <button onClick={()=>setSelected(1)} className={`${selected ==1 ? "cts-selected": ""}`}> Quero Vender! </button>
        </div>
    )
}

export default CompanyTypeSelector