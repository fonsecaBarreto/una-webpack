import React, { useEffect } from 'react'
import ContentGrid from './ContentGrid'
import CategoriasNav from '@/react-apps/pages/feed-busca-page/CategoriasNav'
import ProdutctFeed from '@/react-apps/pages/feed-busca-page/ProductFeed'
import { produtosService } from "@/services/api/produtos-service"
import { useDispatch, useSelector } from 'react-redux'
import { ListingView } from '@/domain/views/ListingView'
import { Produto } from '@/domain/views/Produto'
import { departamentosService } from "@/services/api/departamentos-service"
import { setDepartamentos, setProdutos, setMarcasAvailables} from '@/react-apps/store/reducers/departaments/actions'
 
export const DeparamentoPage = () => {
    
    const dispatch = useDispatch();
    const { produtos, marcasAvailables, struct } = useSelector( (state: any)=>state.departamentos);

    useEffect(()=>{ 
        listDepartamentos();   /* Carregar departamentos */
        listProdutos();  /* Carregar produtos */
    },[])

    const listDepartamentos = () =>{
        departamentosService.list().then(data => dispatch(setDepartamentos(data))) 
    }
  
    const listProdutos = () => {
        const { pageIndex, queries }: ListingView<Produto> = { ...produtos };
        var p = pageIndex + 1
        produtosService.list({ p, ...queries }).then((data: any)=>{
            var produtosListView = { ...data, data: [ ...data.data.produtos ]}
            dispatch(setProdutos(produtosListView, p > 1 ? true : false));
            dispatch(setMarcasAvailables(data.data.marcas))
        })
    }

    const filterChanged = (filters: any) => {
        const { especificacao="", categorias=[], departamentos=[], subCategorias=[] } = filters
        const e = especificacao
        const d = [ ...departamentos ].map(d=>d.value)
        const s = [ ...subCategorias ].map(d=>d.value)
        const c = [ ...categorias ].map(d=>d.value)

        produtosService.list({ p: 1, e, d, s, c }).then((data: any)=>{
            var produtosListView = { ...data, data: [ ...data.data.produtos ]}
            dispatch(setProdutos(produtosListView, false));
            dispatch(setMarcasAvailables(data.data.marcas))
        })
    }

    return (
        <div id="departamento-page">
            <div className='app-container'>
                <ContentGrid>
                    <CategoriasNav onChange={filterChanged} inital_struct={struct} marcas_availables={marcasAvailables}></CategoriasNav> 
                    <ProdutctFeed listProducts={listProdutos} produtos={produtos}></ProdutctFeed>
                </ContentGrid>
            </div>
        </div>
    )
}

export default DeparamentoPage