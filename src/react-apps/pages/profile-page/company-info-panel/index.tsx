import FlexLabelColumn from '@/react-apps/components/una/panel-container/FlexLabelColumn'
import React from 'react'
import './style.css'
import CompanyAddressesPanel from '../company-addresses-panel'
export const CompanyInfoPanel: React.FunctionComponent<any> =({company}) =>{
    return (
        <div className='company-info-panel'>
            <section>
                <CompanyAddressesPanel addresses={company.addresses}></CompanyAddressesPanel>
            </section>
            <section className='company-info-panel-content'>
                <FlexLabelColumn label='Nome Fantasia'>{company.nomeFantasia}</FlexLabelColumn>
                <FlexLabelColumn label='Razão Social'>{company.razaoSocial}</FlexLabelColumn>
                <FlexLabelColumn label='CNPJ'>{company.cnpj}</FlexLabelColumn>
                <FlexLabelColumn label='E-mail Financeiro'>{company.emailFinanceiro}</FlexLabelColumn>
            </section>
            <section className='company-info-panel-content'>
                <FlexLabelColumn label='Telefone Comercial'>{company.telefoneComercial}</FlexLabelColumn>
                <FlexLabelColumn label='Incrição Estadual'>{company.inscricaoEstadual}</FlexLabelColumn>
                <FlexLabelColumn label='status'>{company.ativo ? "Ativo": "Inativo"}</FlexLabelColumn> 
            </section>
    </div>
    )
}


export default CompanyInfoPanel