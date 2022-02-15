import { Forming } from 'fck-react-input-controls'
import React, {useContext, useEffect, useState} from 'react'
import './style.css'
import MapImage from '@/public/assets/images/map.png'
export const CompanyAddressesPanel: React.FunctionComponent<any> = ({addresses}) =>{

    return (
        <div  className='company-address-list' >
            { 
                addresses.map((address:any)=>{ 
                    const { id, cep, uf, rua, numero, detalhes, bairro, cidade } = address
                    return (
                        <div className="company-address-item" key={id}> 
                            <section>
                                <img src={MapImage}></img>
                            </section>
                            <section>
                                <Forming.LabelWrapper label='CEP'>{cep}</Forming.LabelWrapper>
                                <Forming.LabelWrapper label='Endereço'>{rua}, {numero} - {bairro} </Forming.LabelWrapper>
                                <Forming.LabelWrapper label='Cidade'> {cidade}- {uf}</Forming.LabelWrapper>
                                <Forming.LabelWrapper label='detalhes'>{detalhes}</Forming.LabelWrapper>
                            </section>
                        </div>
                    )}) 
            } 
        </div>
    )
}

export default CompanyAddressesPanel