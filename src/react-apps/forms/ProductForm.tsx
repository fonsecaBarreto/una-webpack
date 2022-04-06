import React, { useContext, useEffect } from 'react'
import "./style.css"
import { Controls, Forming } from 'fck-react-input-controls'
import { UseStateAdapter } from 'fck-react-input-controls/lib/Controls'
import UnaModalForm from '../components/una/ModalForm'
import { BiBadgeCheck } from 'react-icons/bi'
import { MdBlock } from 'react-icons/md'

//import { companhiasServices } from '@/services/api/companhias-service'
import Globalcontext from '@/react-apps/apps/main/global-components-context'
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import { produtosService } from '@/services/api/produtos-service'

const INITIAL_DATA= {
    brand: "",
    presentation: "",
    subCategory: "",
    specification: "",
    ncm: "",
    ean: "",
    sku: "",
    image: null,
}

export namespace ProductForm{
    export type Params = {
        entry: any,
        onData: any,
        onAction: any,
        departaments : any
    }
}

export const ProductForm: React.FunctionComponent<ProductForm.Params> = ({ entry={}, onAction, onData, departaments}) =>{
    const context = useContext(Globalcontext)
    const state = UseStateAdapter(INITIAL_DATA)

    useEffect(()=>{ state.data.set({ ...INITIAL_DATA, ...entry }) },[entry])

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
            onAction(-1);
            onData(data)
            context.dialog.push(MakeNotification(() =>{ return -1 },[ "Salvo com sucesso!"],"Sucesso!",NotificationType.SUCCESS))
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
        <UnaModalForm onSave={submit} onCancel={()=>{ onAction(-1)}}  >
            <Forming.FormGrid title="" columns={[4,4,4,12,12,12,12]} freeze={state.loading.get}>
                <Controls.TextBox state={state} label="EAN" name={"ean"} type={Controls.TextBoxTypes.TEXT} /> 
                <Controls.TextBox state={state} label="NCM" name={"ncm"} type={Controls.TextBoxTypes.TEXT} /> 
                <Controls.TextBox state={state} label="SKU" name={"sku"} type={Controls.TextBoxTypes.TEXT} /> 
                <Controls.TextBox placeHolder="Exemplo: Farinha da marca Una" state={state} label="Especificação " name={"specification"}  type={Controls.TextBoxTypes.TEXTAREA}/>
                <Controls.SelectBox state={state} label="Marca" name={"brand"} list={departaments.brands ?? []}  /> 
                <Controls.SelectBox state={state} label="Apresentação" name={"presentation"} list={departaments.presentations ?? []}  /> 
                <Controls.SelectBox state={state} label="Categoria" name={"subCategory"} list={departaments.subCategories ?? []}  /> 
            </Forming.FormGrid>
        </UnaModalForm>
    )
}

export default ProductForm