import React, { useEffect } from 'react'
import './style.css'
import Item from './item'
import { produtosService } from "@/react-apps/services/produtos-service"
import { useSelector } from 'react-redux'

export const ProdutFeed: React.FunctionComponent<any> = () =>{

    const { produtos } = useSelector((state: any)=>state.departamentos)

    useEffect(()=>{ produtosService.list() },[])
    return (
        <div className="una-product-feed">
            {
                produtos && produtos.data.map((p: any, i: string)=>{
                    return (
                        <Item key={i} produto={p} ></Item>
                    )
                })
            }
            <span>tatos de Tantos </span> 
            <button> Mostart Mains </button>
        </div>
    )
}

export default ProdutFeed