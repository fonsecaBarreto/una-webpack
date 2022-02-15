import React from 'react'
import './style.css'
import UserFileItem from './UserFileItem'

const COMPANY_DOCUMENT_SPECIFICATION = "* Arquivos em PDF com tamanho maximo de 9.537 Mb."
export const CompanyFilesPanel: React.FunctionComponent<any> =({documents, company_id}) =>{
    return (
        <div className='company-files-panel'>
            <UserFileItem company_id={company_id}
                name="contrato_social" label={"Contrato Social"} placeHolder={COMPANY_DOCUMENT_SPECIFICATION}
                entry={documents.contrato_social}/>
            <UserFileItem company_id={company_id}
                name="inscricao_estadual" label={"Inscrição Estadual"} placeHolder={COMPANY_DOCUMENT_SPECIFICATION}
                entry={documents.inscricao_estadual}/>
        </div>
    )
}

export default CompanyFilesPanel