import { Forming } from 'fck-react-input-controls'
import React, {useContext, useEffect, useState} from 'react'
import './style.css'

export const AddressItem: React.FunctionComponent<any> = ({address}) =>{
     const { cep, uf, rua, numero, detalhes, bairro, cidade } = address

    return (
        <div className="company-address-item"> 
            <section>
                <Forming.LabelWrapper label='CEP'>{cep}</Forming.LabelWrapper>
                <Forming.LabelWrapper label='Endereço'>{rua}, {numero} - {bairro} </Forming.LabelWrapper>
                <Forming.LabelWrapper label='Cidade'> {cidade}- {uf}</Forming.LabelWrapper>
                <Forming.LabelWrapper label='detalhes'>{detalhes}</Forming.LabelWrapper>
            </section>
        </div>
    )
}

export default AddressItem