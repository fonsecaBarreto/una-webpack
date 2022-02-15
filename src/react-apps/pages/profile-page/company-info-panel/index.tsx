import FlexLabelColumn from '@/react-apps/components/una/panel-container/FlexLabelColumn'
import React from 'react'
import './style.css'
import ShopImage from "@assets/images/shop.png"
export const CompanyInfoPanel: React.FunctionComponent<any> =({company}) =>{
    return (
        <div className='company-info-panel'>
            <img src={ShopImage}></img>
            <div className='company-info-panel-content'>
                <FlexLabelColumn label='Nome Fantasia'>{company.nomeFantasia}</FlexLabelColumn>
                <FlexLabelColumn label='Razão Social'>{company.razaoSocial}</FlexLabelColumn>
                <FlexLabelColumn label='CNPJ'>{company.cnpj}</FlexLabelColumn>
                <FlexLabelColumn label='E-mail Financeiro'>{company.emailFinanceiro}</FlexLabelColumn>
                <FlexLabelColumn label='Telefone Comercial'>{company.telefoneComercial}</FlexLabelColumn>
                <FlexLabelColumn label='Incrição Estadual'>{company.inscricaoEstadual}</FlexLabelColumn>
                <FlexLabelColumn label='status'>{company.ativo ? "Ativo": "Inativo"}</FlexLabelColumn> 
            </div>
    </div>
    )
}


export default CompanyInfoPanel