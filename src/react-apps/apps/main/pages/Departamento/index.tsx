import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import ContentGrid from './ContentGrid'
import NavCategorias from '@/react-apps/components/NavCategorias'
import ProdutctFeed from '@/react-apps/components/ProdutctFeed'
import { setProdutosFeed } from '@/react-apps/store/reducers/departaments/actions'
import { produtosService } from "@/react-apps/services/produtos-service"
import { ProductListView } from '@/domain/views/Produto'
import { useSelector, useDispatch} from 'react-redux'

export const DeparamentoPage = () => {
    
    const dispatch = useDispatch();
    const [ toRequest, setToRequest] = useState(false)
    const { produtos_feed } = useSelector( (state: any)=>state.departamentos)
  

    const filterChanged = (filters: any) => {
      
        /* Quando os filtros mudam pageIndex é setado para 0 */
        const { especificacao="", categorias=[], departamentos=[], subCategorias=[] } = filters
        const e = especificacao
        const d = [ ...departamentos ].map(d=>d.value)
        const s = [ ...subCategorias ].map(d=>d.value)
        const c = [ ...categorias ].map(d=>d.value)

        dispatch(setProdutosFeed({
            total: 0, length: 0,  data: [],                      
            queries: {e,d,s,c},
            pages: 0, pageIndex: 0
        }))
        setToRequest(true)
    }

    useEffect(()=>{
        if(toRequest === true){
            listProducts();
            setToRequest(false)
        }
    },[toRequest])

    const listProducts = () => {
        console.log("listando produto aqui")
        const listingView: ProductListView = { ...produtos_feed };
        const { pageIndex, queries } = listingView
        return produtosService.list({ p: pageIndex, ...queries}) 
    }

    return (
        <div id="departamento-page">
            <div className='app-container'>
                <ContentGrid>
                    <NavCategorias onChange={filterChanged}></NavCategorias>
                    <ProdutctFeed listProducts={listProducts}></ProdutctFeed>  {/*  set 'on Text change' */}
                </ContentGrid>
            </div>
        </div>
    )
}

export default DeparamentoPage