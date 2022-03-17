import React, { useEffect, useContext, useState } from 'react'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import CategoriasNav from '@/react-apps/pages/feed-busca-page/CategoriasNav'
import ProductFeed from '@/react-apps/pages/feed-busca-page/ProductFeed'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { departamentosService } from "@/services/api/departamentos-service"
import { produtosService } from "@/services/api/produtos-service"
import { setDepartaments, setProducts } from '@/react-apps/store/reducers/mart'
import GlobalContext from "@/react-apps/apps/main/global-components-context"

export const DeparamentoPage = () => {

    const dispatch = useDispatch();
    const context = useContext(GlobalContext);

    const { departaments, departaments_loadtry, products } = useSelector( (state: any)=>state.mart);

    useEffect(()=>{ 
        // Baixa os departamentos
        if(departaments_loadtry == 0 ) departamentosService.list().then(data => { dispatch(setDepartaments(data))});
        // Baixas os produto
        handleLoad();
    },[])

    const handleLoad= ({v="", p=1, ...rest }: any={}) => {
        produtosService.list({ ...rest, specification: v , p}).then( r => dispatch(setProducts(r)))
    }

    return (
        <div id="departamento-page">
            <div className='app-container'>
                <ContentGrid>
                    <CategoriasNav loading={departaments_loadtry > 0} onChange={handleLoad} departaments_struct={departaments} brands_available={products.data.brands_available}></CategoriasNav>  
                    <ProductFeed onRequest={()=>console.log("teste")} list_data={products}></ProductFeed> 
                </ContentGrid> 
            </div> 
        </div>
    )
}

export default DeparamentoPage

        /*  
            const { queries, pageIndex } = products_listingview;
            const data = await produtosService.list({ ...queries, p: append ? pageIndex + 1 : 1 }) 
        */