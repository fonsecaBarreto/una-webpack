import { Controls, Forming } from 'fck-components'
import { UseStateAdapter } from 'fck-components/lib/Controls'

import React, { useEffect } from 'react'
import "./style.css"

export namespace newProductModal{
    export type Params = {
        dto: any
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

export const NewProductModal: React.FunctionComponent<newProductModal.Params> = ({dto}) =>{

    const newProductState = UseStateAdapter({ ...INITIAL_PRODUCTS})
  
    useEffect(()=>{

    },[dto])
    return (
        <div className={`new-product-modal`}>   
            <Forming.FormGrid title="" columns={[4,4,4,12,12,12,12,12]}>

                <Controls.TextBox placeHolder="000000000000" state={newProductState}
                    label={"Codigo (EAN)"} name={"ean"} type={Controls.TextBoxTypes.TEXT}/>

                <Controls.TextBox placeHolder="000000000000" state={newProductState}
                    label={"Codigo (NCM)"} name={"ncm"} type={Controls.TextBoxTypes.TEXT}/>

                <Controls.TextBox placeHolder="000000000000" state={newProductState}
                    label={"Codigo (SKU)"} name={"sku"} type={Controls.TextBoxTypes.TEXT}/>

                <Controls.TextBox placeHolder="Especificação" state={newProductState}
                    label={"Especificação"} name={"specification"} type={Controls.TextBoxTypes.TEXT}/>

                <Controls.TextBox placeHolder="Marca" state={newProductState}
                    label={"Marca"} name={"brand_name"} type={Controls.TextBoxTypes.TEXT}/>

             </Forming.FormGrid>
        </div>
    )
}

export default NewProductModal

