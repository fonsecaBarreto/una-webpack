import * as React from 'react';
import "./style.css"

export const CompanyHeaderView:React.FunctionComponent<any> = ({company_name, user_name, label="Meu histórico de Cotações"}) =>{

    return (
        <div className='cotacoes-una-header-view'>
            <div className='cuhb-company-info'>
                <h3> {company_name} | {label}</h3>
                <span> {user_name}</span>
            </div>

            <span> </span> 
        </div>
    )
}
export default CompanyHeaderView