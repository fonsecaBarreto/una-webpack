import * as React from 'react';
import "./style.css"

export const CompanyHeaderView:React.FunctionComponent<any> = ({company, user_name}) =>{

    return (
        <div className='cotacoes-una-header-view'>
            <div className='cuhb-company-info'>
                <h3> {company.nomeFantasia} | Meu histórico de Cotações</h3>
                <span> {user_name}</span>
            </div>

            <span> </span> 
        </div>
    )
}
export default CompanyHeaderView