import React, { useEffect, useState } from 'react'
import './style.css'
import { Forming } from "fck-react-input-controls"
import { companhiasServices } from '@/services/api/companhias-service'
import { setCompanhias } from '@/react-apps/store/reducers/companhias/actions'
import { Companhia } from '@/domain/views/Companhia'
export namespace CompanhiasView {
    export type Params = { 
        companhia_id: string
    }
}

export const CompanhiasView: React.FunctionComponent<CompanhiasView.Params> = ({ companhia_id }) =>{
    const [ companhia, setCompanhia] = useState<Companhia | null>(null)
    useEffect(()=>{
        companhiasServices.find(companhia_id).then(setCompanhia)
    },[companhia_id])

    return (
        <div className='companhia-view-modal'>

            { companhia === null ? "loading..." : 
            <React.Fragment>
                <section className="companhia-view-modal-header">
                   
                    <img></img>
                    <div className='flex-column'>
                    <Forming.LabelWrapper label='Nome Fantasia'>{companhia.nomeFantasia}</Forming.LabelWrapper>
                    <Forming.LabelWrapper label='Razão Social'>{companhia.razaoSocial}</Forming.LabelWrapper>
                    <Forming.LabelWrapper label='CNPJ'>{companhia.cnpj}</Forming.LabelWrapper>
                    <Forming.LabelWrapper label='E-mail Financeiro'>{companhia.emailFinanceiro}</Forming.LabelWrapper>
                    <Forming.LabelWrapper label='Telefone Comercial'>{companhia.telefoneComercial}</Forming.LabelWrapper>
                    <Forming.LabelWrapper label='Incrição Estadual'>{companhia.inscricaoEstadual}</Forming.LabelWrapper>
                    <Forming.LabelWrapper label='status'>{companhia.ativo ? "Ativo": "Inativo"}</Forming.LabelWrapper>
                </div> 
                </section>

                <hr></hr>

                <section className="companhia-view-modal-body">
                    <h3> Usuarios </h3>
                    <ul>
                        {companhia.pessoal.map(u=>{
                            return <li> {u.nome}</li>
                        })}
                    </ul>
                </section>
                
                <section className="companhia-view-modal-footer">

                    <h3> Endereços </h3>
                    <ul>
                        {companhia.enderecos.map(u=>{
                            return <li> {u.cidade} - {u.bairro}</li>
                        })}
                    </ul>
     
                </section>

            </React.Fragment>
            }
        </div>
    )
}

export default CompanhiasView