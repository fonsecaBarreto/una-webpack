import React from 'react'
import "./style.css"

export namespace newProductModal{
    export type Params = {
        dto: any
    }
}

export const newProductModal: React.FunctionComponent<newProductModal.Params> = ({dto}) =>{
/* 
    const handleInputs =(e: any) =>{ onInput( name, line, e.target.value)  }
 */
    return (
        <div className={`new-product-modal`}>   
          {JSON.stringify(dto)}
        </div>
    )
}

export default newProductModal

