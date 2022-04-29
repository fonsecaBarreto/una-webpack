import { Forming } from 'fck-react-input-controls'
import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import MapImage from '@/public/assets/images/buildings.png'
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
                                <span>
                                    {cep} {rua} {numero}, {bairro}, {cidade}- {uf} 
                                </span>
                                <span> {detalhes}</span>
                                    
                            </section>
                        </div>
                    )}) 
            } 
        </div>
    )
}

export default CompanyAddressesPanel