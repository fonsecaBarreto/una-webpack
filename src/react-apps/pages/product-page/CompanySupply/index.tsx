import React from 'react'
import "./style.css"

export const CompanySupply: React.FunctionComponent<any> = ({ isSelected = false, supply, onChange}) => {

    /* const formatarData  = (data: Date) => {
      let dataFormatada = (data.getDate() + "/" + ((data.getMonth() + 1)) + "/" + (data.getFullYear() )) ;                 
      return dataFormatada
    } */

    return (
    <div className='company-supply-component' onClick={()=>onChange('VALUE', supply )}> 
        <section>
          <input 
              name="supply"
              checked={isSelected}
              type="radio"/>
        </section>
        <section>
          <span className='company-supply-price'> R$: {supply.price.toFixed(2)} </span>
          <span>por { supply.company_name }</span>
          <span className='company-supply-minimum_order'> 
            compra minina de { supply.minimum_order+ " " }
            unidade{supply.minimum_order > 1 ? "s": ""} </span>
        </section>       
    </div>)
}

  export default CompanySupply