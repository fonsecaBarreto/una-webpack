import React, { useEffect, useState, FunctionComponent, useContext } from 'react'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import ProductFeed from '@/react-apps/pages/mart-page/ProductFeed'
import { useDispatch } from 'react-redux'
import { produtosService } from "@/services/api/produtos-service"
import { setProducts } from '@/react-apps/store/reducers/mart'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import CategoriasNav from './CategoriasNav'
import UseTrigger from '@/react-apps/components/utils/UseTrigger'
import GlobalContext from '@/react-apps/apps/main/global-components-context'
import { MakeDialogConfig, MakeNotification, NotificationType } from 'fck-react-dialog'
import { setGodMode } from '@/react-apps/store/reducers/main/actions'
import ProductForm from '@/react-apps/forms/ProductForm'
import { setLoading } from "@/react-apps/store/reducers/main/actions"

export const SEARCH_HEADER= { 
    params : [ "departament_id" ],
    search : [ "category", "subCategory", "brand", "v", "p", "admin-item" ]
};

export const MartPage: FunctionComponent<any> = ({ history}) => {

    const { parsedSearch, parsedParams, pushToHistory } = UseSearchAdapter({ header: SEARCH_HEADER })
    const [ isLoading, setIsLoading ] = useState(false);
    const context = useContext(GlobalContext)
    const filterTrigger = UseTrigger();
    const dispatch = useDispatch();
 
    useEffect(()=>{ 
        handleSearch();
        if( parsedSearch?.["admin-item"].length ){ handleProductForm() }
    },[parsedSearch, parsedParams])

    const handleProductForm =async () =>{
        dispatch(setLoading(true));
        const product:any = parsedSearch["admin-view"] === "new" ? {} : 
        await produtosService.find({ean: parsedSearch["admin-item"][0] })
            .finally(()=>{ dispatch(setLoading(false)) })
        
        context.dialog.push(MakeDialogConfig(
            ({onAction})=>( <ProductForm entry={{...product.product}} onAction={onAction} onData={()=>{}}/>
            ),()=>{ pushToHistory({"admin-item": []});
            }, parsedSearch["admin-item"] ? "Atualizar Produto" : "Novo Produto")
        );
    }

    const handleSearch = async () => {
        setIsLoading(true)
        produtosService.list({ ...parsedSearch, ...parsedParams}).then( r => dispatch(setProducts(r)))
        .finally(()=>{ setIsLoading(false) })
    }

    const handleFilterChange = (arg: object, clear: boolean) => { pushToHistory(arg, clear) }

    const handleActions = (key:string, p: any) =>{
        switch(key){
            case "HISTORY": history.push("/registro");break;
            case "SET_PAGE": pushToHistory({p: p+""}); break;
            case "SHOW_FILTERS": filterTrigger.execute();break;
            case "ADMIN": pushToHistory({ "admin-item": p }); break;
            case "GOD_MODE":
                context.dialog.push(MakeNotification((n)=>{
                    if(n === 0){ dispatch(setGodMode(true))} return -1;
                },["Você está prestes a entrar no modo administrador", "tem certeza disso?"],"Atenção", NotificationType.CONFIRMATION))
            break;
        }
    }
    return (
        <div id="departamento-page">
            <div className='app-container'>
               {/*  <ContentGrid loading={isLoading}>
                    <CategoriasNav 
                        freeze={false} trigger={filterTrigger} departament_id={parsedParams?.["departament_id"] ?? ""} 
                        values={ parsedSearch } onChange={handleFilterChange}> </CategoriasNav>
                    <ProductFeed onChange={handleActions} ></ProductFeed>  
                </ContentGrid>  */}
            </div> 
        </div>
    )
}

export default MartPage
