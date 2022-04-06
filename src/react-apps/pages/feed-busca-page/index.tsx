import React, { useEffect, useState, FunctionComponent, useContext } from 'react'
import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import ProductFeed from '@/react-apps/pages/feed-busca-page/ProductFeed'
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
import MediaPlayListModal from '@/react-apps/components/Modals/MediaPlayList'
export const SEARCH_HEADER= { category: "array", subCategory:"array", brand: "array", v: "string", p: "string" };

export const MartPage: FunctionComponent<any> = ({}) => {

    const context = useContext(GlobalContenxt);
    const dispatch = useDispatch();
    const { parsed: parsed_data, parsedParam,  pushToHistory } = UseSearchAdapter({ search: SEARCH_HEADER, param:"departament_id" })

    const { departaments, loadtry, products } = useSelector( (state: any)=>state.mart);
    useEffect(()=>{ if(loadtry == 0 ) departamentosService.list().then(data => { dispatch(setDepartaments(data))}); },[])
    
    const filterTrigger = UseTrigger();
    
    useEffect(()=>{ if(parsed_data){ handleLoad()} },[parsed_data])
    const handleLoad= () => { produtosService.list({ ...parsed_data, ...parsedParam}).then( r => dispatch(setProducts(r))) }

    const handleActions = (key:string, p: any) =>{
        switch(key){
            case "p": pushToHistory(p+"", 'p'); break;
            case "SHOW_FILTERS": filterTrigger.execute();break;
            case "ADMINS_MODE":
                context.dialog.push(MakeNotification((n)=>{
                    if(n === 0){ dispatch(setGodMode(true))}
                    return -1
                },["Você está prestes a entrar no modo administrador", "tem certeza disso?"],"Atenção", NotificationType.CONFIRMATION))
            break;
            case "ADD_PRODUCT":
                context.dialog.push(MakeDialogConfig(({onAction})=>(<ProductForm departaments={departaments} entry={{}} onAction={onAction} onData={()=>{}}/>),()=>-1,"Novo Produto"))
            ;break;
            case "UPDATE_PRODUCT":
                context.dialog.push(MakeDialogConfig(({onAction})=>(<ProductForm departaments={departaments} entry={p} onAction={onAction} onData={()=>{}}/>),()=>-1,"Atualizar Produto"))
            ;break
        }
    }

    return (
        <div id="departamento-page">
            <div className='app-container'>
               <MediaPlayListModal></MediaPlayListModal> 
                {/* <ContentGrid>
                    <CategoriasNav 
                        trigger={filterTrigger}
                        departament_id={parsedParam?.["departament_id"] ?? ""} 
                        values={ parsed_data } onChange={pushToHistory}> </CategoriasNav> 
                    <ProductFeed onAction={handleActions} list_data={products} ></ProductFeed>    
                </ContentGrid>  */}
            </div> 
        </div>
    )
}

export default MartPage

 