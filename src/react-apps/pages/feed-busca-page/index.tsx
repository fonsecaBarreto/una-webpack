import React, { useEffect, useContext } from 'react'
import ContentGrid from './ContentGrid'
import CategoriasNav from '@/react-apps/pages/feed-busca-page/CategoriasNav'
import ProdutctFeed from '@/react-apps/pages/feed-busca-page/ProductFeed'
import { useDispatch, useSelector } from 'react-redux'
import { departamentosService } from "@/services/api/departamentos-service"
import { setDepartamentos, setProdutos, spliceProdutosQueries, setMarcasAvailables} from '@/react-apps/store/reducers/departaments/actions'
import GlobalContext from "@/react-apps/apps/main/global-components-context"

export const DeparamentoPage = () => {

    const context = useContext(GlobalContext)
    const dispatch = useDispatch();
    const { produtos, marcasAvailables, struct } = useSelector( (state: any)=>state.departamentos);

    useEffect(()=>{ 
        departamentosService.list().then(data => dispatch(setDepartamentos(data))) 
        context.methods.listProdutos(false)
    },[])

    const filterChanged = (filters: any) => {
        const { categorias=[], departamentos=[], subCategorias=[], marcas } = filters
        const d = [ ...departamentos ].map(d=>d.value)
        const c = [ ...categorias ].map(d=>d.value)
        const s = [ ...subCategorias ].map(d=>d.value)
        const m = [ ...marcas ].map(d=>d.value)
        dispatch(spliceProdutosQueries({ d, s, c, m }))
    }

    return (
        <div id="departamento-page">
            <div className='app-container'>
                 <ContentGrid>
                    <CategoriasNav onChange={filterChanged} inital_struct={struct} marcas_availables={marcasAvailables}></CategoriasNav> 
                    <ProdutctFeed more={()=>context.methods.listProdutos(true)} produtos={produtos}></ProdutctFeed>
                </ContentGrid>
            </div> 
        </div>
    )
}

export default DeparamentoPage