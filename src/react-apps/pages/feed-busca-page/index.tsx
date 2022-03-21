import React, { useEffect, useState, FunctionComponent } from 'react'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
//import CategoriasNav from '@/react-apps/pages/feed-busca-page/CategoriasNav'
import ProductFeed from '@/react-apps/pages/feed-busca-page/ProductFeed'
import { useDispatch, useSelector } from 'react-redux'
import { produtosService } from "@/services/api/produtos-service"
import { setProducts } from '@/react-apps/store/reducers/mart'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import CategoriasNav from './CategoriasNav'

export const SEARCH_HEADER= { category: "array", subCategory:"array", brand: "array", v: "string", p: "string" };

export const MartPage: FunctionComponent<any> = ({}) => {
    const dispatch = useDispatch();
    const { parsed: parsed_data, parsedParam,  pushToHistory } = UseSearchAdapter({ search: SEARCH_HEADER, param:"departament_id" })
    const { products } = useSelector( (state: any)=>state.mart);
    
    useEffect(()=>{ if(parsed_data){ handleLoad()} },[parsed_data])
    const handleLoad= () => { produtosService.list({ ...parsed_data, ...parsedParam}).then( r => dispatch(setProducts(r))) }

    return (
        <div id="departamento-page">
            <div className='app-container'>
                <ContentGrid>
                    <CategoriasNav 
                        departament_id={parsedParam?.["departament_id"] ?? ""} 
                        values={ parsed_data } onChange={pushToHistory}> </CategoriasNav> 
                    <ProductFeed onAction={(key:string, p: number)=> pushToHistory(p+"", 'p')} list_data={products} ></ProductFeed>    
                </ContentGrid> 
            </div> 
        </div>
    )
}

export default MartPage

 