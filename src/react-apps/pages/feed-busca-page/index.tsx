import React from 'react'
import ContentGrid from '../../components/ContentGrid'
import NavCategorias from '@/react-apps/components/NavCategorias'
import ProdutctFeed from '@/react-apps/components/ProdutctFeed'
import { produtosService } from "@/services/produtos-service"
import { useSelector } from 'react-redux'
import { ListingView } from '@/domain/views/ListingView'
import { Produto } from '@/domain/views/Produto'

export const DeparamentoPage = () => {
    
    const { produtos_feed } = useSelector( (state: any)=>state.departamentos)
  
    /* Listagem feita pela categorias */
    const filterChanged = (filters: any) => {
        const { especificacao="", categorias=[], departamentos=[], subCategorias=[] } = filters
        const e = especificacao
        const d = [ ...departamentos ].map(d=>d.value)
        const s = [ ...subCategorias ].map(d=>d.value)
        const c = [ ...categorias ].map(d=>d.value)
        return produtosService.list({ p: 0, e, d, s, c }) 
    }

    /* Listagem de produtos fetira pelo botao de ver mais */
    const listProducts = () => {
        const listingView: ListingView<Produto> = { ...produtos_feed };
        const { pageIndex, queries } = listingView
        return produtosService.list({ p: pageIndex + 1, ...queries }) 
    }

    /* Listagem feita pela barra de pesquisa deve ficar aqui a baixo*/
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