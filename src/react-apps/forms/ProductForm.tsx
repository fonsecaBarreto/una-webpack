import React, { useContext, useEffect } from 'react'
import "./style.css"
import { Controls, Forming } from 'fck-react-input-controls'
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls'
import UnaModalForm from '../components/una/ModalForm'
import { GlobalContext } from "@/react-apps/apps/GlobalContext"
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import { produtosService } from '@/services/api/produtos-service'
import MediaPlayListModal from '../components/Modals/MediaPlayList'
import { departamentosService } from '@/services/api/departamentos-service'
import { useDispatch, useSelector } from 'react-redux'
import { setDepartaments } from '../store/reducers/mart'

const INITIAL_DATA= {
    brand: "",
    presentation: "",
    subCategory: "",
    specification: "",
    ncm: "",
    ean: "",
    sku: "",
    media_playlist_id: ""
}

export namespace ProductForm{
    export type Params = {
        entry: any | null,
        onData: any,
        onAction: any
    }
}

export const ProductForm: React.FunctionComponent<ProductForm.Params> = ({ entry=null, onAction, onData}) =>{
    
    const { departaments, loadtry } = useSelector( (state: any)=>state.mart);
    const state: any = UseStateAdapter(INITIAL_DATA)
    const context = useContext(GlobalContext)
    const dispatch = useDispatch();

    useEffect(()=>{ if(loadtry == 0 ) departamentosService.list().then(data => { dispatch(setDepartaments(data))}); },[loadtry])

    useEffect(()=>{
        if(entry !== null) return state.data.set({ ...INITIAL_DATA, ...entry }) 
    },[entry])

    const handleMediaPlayListResult =(result: any) => {
        if(!result) return;
        state.data.onInput("media_playlist_id", result.id)
    }

    const submit = async () =>{
        state.loading.set(true)
        state.errors.clear()
        try{
            const { presentation, subCategory, brand, ...rest} = state.data.get;
            const payload = { ...rest,
                brand_id: brand?.value ?? "",
                sub_category_id: subCategory?.value ?? "",
                presentation_id: presentation?.value ?? "",
            }   
            const data = await produtosService.upsert(payload)
            onData(data)
            context.dialog.push(MakeNotification(() =>{ return -1 },[ "Salvo com sucesso!"],"Sucesso!",NotificationType.SUCCESS))
            onAction(-1);
        }catch(err:any){ 
            if (err.params) {  
                if(err.params?.brand_id) { err.params.brand = err.params.brand_id}
                if(err.params?.presentation_id) { err.params.presentation = err.params.presentation_id}
                if(err.params?.sub_category_id) { err.params.subCategory = err.params.sub_category_id}
                state.errors.set(err.params) 
            }
        }finally{ state.loading.set(false) } 
    }

    return (
        <React.Fragment>
            {!departaments ? "Carregando ..." :
            <UnaModalForm onSave={submit} onCancel={()=>{ onAction(-1)}}  >
                <Forming.FormGrid title="" columns={[12, 4,4,4,12,12,12,12]} freeze={state.loading.get}>
                    <MediaPlayListModal onData={handleMediaPlayListResult} playlist_id={state.data.get["media_playlist_id"]}></MediaPlayListModal> 
                    <Controls.TextBox state={state} label="EAN" name={"ean"} type={Controls.TextBoxTypes.TEXT} /> 
                    <Controls.TextBox state={state} label="NCM" name={"ncm"} type={Controls.TextBoxTypes.TEXT} /> 
                    <Controls.TextBox state={state} label="SKU" name={"sku"} type={Controls.TextBoxTypes.TEXT} /> 
                    <Controls.TextBox placeHolder="Exemplo: Farinha da marca Una" state={state} label="Especificação " name={"specification"}  type={Controls.TextBoxTypes.TEXTAREA}/>
                    <Controls.SelectBox state={state} label="Marca" name={"brand"} list={departaments.brands ?? []}  /> 
                    <Controls.SelectBox state={state} label="Apresentação" name={"presentation"} list={departaments.presentations ?? []}  /> 
                    <Controls.SelectBox state={state} label="Categoria" name={"subCategory"} list={departaments.subCategories ?? []}  /> 
                </Forming.FormGrid>
            </UnaModalForm>
            }
        </React.Fragment>
    )
}

export default ProductForm