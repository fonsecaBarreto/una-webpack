import * as React from 'react';
import "./style.css"

import MapImage from '@assets/images/buildings.png'

export const CompanyHeaderView:React.FunctionComponent<any> = ({company}) =>{
    return (
        <div className='cotacoes-una-header-view'>
            <div className='cuhb-imagevp'>
                <img src={MapImage}/>
            </div>
            <span> {company.nomeFantasia}</span>
            <span> {company.razaoSocial}</span>
            <span> </span> 
        </div>
    )
}
export default CompanyHeaderView