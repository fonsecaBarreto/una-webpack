import React, { useEffect, useState, FunctionComponent, useContext } from 'react'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import ProductFeed from '@/react-apps/pages/mart-page/ProductFeed'
import { useDispatch, useSelector } from 'react-redux'
import { produtosService } from "@/services/api/produtos-service"
import { setDepartaments, setProducts } from '@/react-apps/store/reducers/mart'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import CategoriasNav from './CategoriasNav'
import UseTrigger from '@/react-apps/components/utils/UseTrigger'
import GlobalContenxt from '@/react-apps/apps/main/global-components-context'
import { MakeDialogConfig, MakeNotification, NotificationType } from 'fck-react-dialog'
import { setGodMode } from '@/react-apps/store/reducers/main/actions'
import ProductForm from '@/react-apps/forms/ProductForm'
import { departamentosService } from '@/services/api/departamentos-service'

export const SEARCH_HEADER= { 
    params : [ "departament_id" ],
    search : [ "category", "subCategory", "brand", "v", "p", "ean" ]
};

export const MartPage: FunctionComponent<any> = ({}) => {

    const { parsedSearch, parsedParams, pushToHistory } = UseSearchAdapter({ header: SEARCH_HEADER })
    const [ isLoading, setIsLoading ] = useState(false);
    const filterTrigger = UseTrigger();
    const dispatch = useDispatch();

    useEffect(()=>{ handleSearch() },[parsedSearch, parsedParams])

    const handleSearch = async () => {
        setIsLoading(true)
        produtosService.list({ ...parsedSearch, ...parsedParams}).then( r => dispatch(setProducts(r)))
        .finally(()=>{ setIsLoading(false) })
    }

    const handleFilterChange = (arg: object, clear: boolean) => { pushToHistory(arg, clear) }

    return (
        <div id="departamento-page">
            <div className='app-container'>
                 <ContentGrid>
                    
                    <CategoriasNav 
                        freeze={isLoading} trigger={filterTrigger} departament_id={parsedParams?.["departament_id"] ?? ""} 
                        values={ parsedSearch } onChange={handleFilterChange}> </CategoriasNav>
                    <div>
                        { JSON.stringify(parsedSearch) }
                        { JSON.stringify(parsedParams) }
                    </div>
                        { /*
                    <ProductFeed onAction={handleActions} list_data={products} ></ProductFeed>  */}   
                </ContentGrid> 
            </div> 
        </div>
    )
}

export default MartPage

  /* const handleActions = (key:string, p: any) =>{
        switch(key){
            case "p": pushToHistory(p+"", 'p'); break;
            case "SHOW_FILTERS": filterTrigger.execute();break;
            case "ADMINS_MODE":
                context.dialog.push(MakeNotification((n)=>{
                    if(n === 0){ dispatch(setGodMode(true))} return -1;
                },["Você está prestes a entrar no modo administrador", "tem certeza disso?"],"Atenção", NotificationType.CONFIRMATION))
            break;
            case "ADD_PRODUCT": pushToHistory("NOVO", 'ean'); break;
            case "UPDATE_PRODUCT": pushToHistory(p.ean, 'ean'); break;
        }
    } */


       /*  if(!parsed_data) return;
        if(parsed_data.ean) {
            const product = parsed_data.ean === "NOVO" ? {} : await produtosService.find({ean: parsed_data.ean})
            context.dialog.push(MakeDialogConfig(
                ({onAction})=>( <ProductForm departaments={departaments} entry={product.product} onAction={onAction} onData={()=>{}}/>
                ),()=>{ pushToHistory("", 'ean'); }, parsed_data.ean ? "Atualizar Produto" : "Novo Produto")
            );
        }else{
            */