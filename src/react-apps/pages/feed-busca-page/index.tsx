import React, { useEffect, useContext, useState } from 'react'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import CategoriasNav from '@/react-apps/pages/feed-busca-page/CategoriasNav'
import ProductFeed from '@/react-apps/pages/feed-busca-page/ProductFeed'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { departamentosService } from "@/services/api/departamentos-service"
import { setDepartamentos, spliceProdutosQueries } from '@/react-apps/store/reducers/departaments/actions'
import GlobalContext from "@/react-apps/apps/main/global-components-context"

export const DeparamentoPage = () => {

    const context = useContext(GlobalContext)
    const { departaments_struct, products_listingview } = useSelector( (state: any)=>state.departamentos);

    const dispatch = useDispatch();

    useEffect(()=>{  departamentosService.list().then(data => { dispatch(setDepartamentos(data))})  },[])

    const filterChanged = (filters: any) => {
        const { categories, departaments, subCategories, brands } = filters;
        dispatch(spliceProdutosQueries({ 
            departament: departaments.map((v:any)=>v.value), 
            category: categories.map((v:any)=>v.value), 
            subCategory: subCategories.map((v:any)=>v.value), 
            brand: brands.map((v:any)=>v.value), 
        })) 
    } 

    return (
        <div id="departamento-page">
            <div className='app-container'>
                <ContentGrid>
                    <CategoriasNav onChange={filterChanged} inital_struct={departaments_struct} marcas_availables={products_listingview.data.brands}></CategoriasNav> 
                    <ProductFeed more={()=>context.methods.listProdutos(true)} listingView={products_listingview}></ProductFeed> 
                </ContentGrid> 
            </div> 
        </div>
    )
}

export default DeparamentoPage