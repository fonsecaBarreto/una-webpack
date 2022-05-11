import React from 'react'
import "./style.css"

export const CompanySupply: React.FunctionComponent<any> = ({supply}) => {

    const formatarData  = (data: Date) => {
      let dataFormatada = (data.getDate() + "/" + ((data.getMonth() + 1)) + "/" + (data.getFullYear() )) ;                 
      return dataFormatada
    }

    return (
    <div className='company-supply-component'> 
        <span> &#8250;</span>
        <span>R$: {supply.price.toFixed(2)}</span>
        <span> Expira em : { formatarData(new Date(supply.expiration))}</span>
    </div>)
}

  export default CompanySupply