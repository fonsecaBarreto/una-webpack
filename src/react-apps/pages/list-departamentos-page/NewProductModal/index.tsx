import { Controls, Forming } from 'fck-components'
import { UseStateAdapter } from 'fck-components/lib/Controls'

import React, { useEffect } from 'react'
import ProductFeed from '../../feed-busca-page/ProductFeed'
import "./style.css"

export namespace newProductModal{
    export type Params = {
        dto: any,
        onchange: (payload: any) => void
        onAction: (n:number) => void
    }
}

const INITIAL_PRODUCTS = {
    ean: "", 
    specification: "", 
    brand_name: "", 
    category_name: "", 
    presentation_name: "" ,
    ncm: "", 
    sku: "", 
}

export const NewProductModal: React.FunctionComponent<newProductModal.Params> = ({dto, onchange, onAction}) =>{

    const newProductState = UseStateAdapter({ ...INITIAL_PRODUCTS})
  
    useEffect(()=>{
        if(dto){  return newProductState.data.set(dto)  }
    },[dto])

    useEffect(()=>{
        onchange(newProductState.data.get)
    },[newProductState.data.get])

    const submit = () =>{
        /* onchange(newProductState.data.get) 
        return onAction(-1) */
    }

    return (
        <div className={`new-product-modal`}>   
            <Forming.FormGrid title="" columns={[4,4,4,12,12,12,12,12]}>

                <Controls.TextBox placeHolder="000000000000" state={newProductState}
                    label={"Codigo (EAN)"} name={"ean"} type={Controls.TextBoxTypes.TEXT}/>

                <Controls.TextBox placeHolder="000000000000" state={newProductState}
                    label={"Codigo (NCM)"} name={"ncm"} type={Controls.TextBoxTypes.TEXT}/>

                <Controls.TextBox placeHolder="000000000000" state={newProductState}
                    label={"Codigo (SKU)"} name={"sku"} type={Controls.TextBoxTypes.TEXT}/>

                <Controls.TextBox placeHolder="Sub Categoria" state={newProductState}
                    label={"Sub Categoria"} name={"category_name"} type={Controls.TextBoxTypes.TEXT}/>

                <Controls.TextBox placeHolder="Especificação" state={newProductState}
                    label={"Especificação"} name={"specification"} type={Controls.TextBoxTypes.TEXT}/>

                <Controls.TextBox placeHolder="Exemplo: 1Kg" state={newProductState}
                    label={"Apresentaçao"} name={"presentation_name"} type={Controls.TextBoxTypes.TEXT}/>

                <Controls.TextBox placeHolder="Marca" state={newProductState}
                    label={"Marca"} name={"brand_name"} type={Controls.TextBoxTypes.TEXT}/>

                <div>
                    <button className='una-submit-button' onClick={submit}> Pronto </button>
                </div>

             </Forming.FormGrid>
        </div>
    )
}

export default NewProductModal

