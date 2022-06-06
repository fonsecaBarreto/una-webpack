import React, { useEffect, useState, useContext } from 'react'
import './style.css'
import { Forming } from "fck-react-input-controls"
import { companhiasServices } from '@/services/api/companhias-service'
import { Companhia } from '@/domain/views/Company'
import { BlAsideLayout } from '@/react-apps/layouts/BlueLagum/AsideModal'
import CompanyForm from '@/react-apps/forms/CompanyForm'
import { useDispatch } from 'react-redux'
import { setLoading } from '@/react-apps/store/reducers/main/actions'
import CompaniesDocumentsForm from '@/react-apps/forms/CompaniesDocumentsForm'
import StaffContent from "./StaffContent"
import AddressContent from "./AddressContent"
import ListCompanhiasPage from '../..'
import AbrangenciaForm from '@/react-apps/forms/AbrangenciaForm'
import Button from 'react-bootstrap/Button'
import { MakeNotification, NotificationType } from 'fck-react-dialog'
import GlobalContext from '@/react-apps/apps/GlobalContext'
export namespace CompanyAsideContent {
    export type Params = { 
        company_id: string,
        onChange: any
    }
}

export const NavOptions: React.FunctionComponent<any> = ({ list, onChange }) =>{
    return (
        <nav className='comapanies-nav-options'>
            {list.map((b:any, i :number) =>{
                return (
                    <Button key={i} onClick={()=>onChange(i)} variant="outline-light"> {b}</Button>
                )
            })}
        </nav>
    )
}


const labels = [ "Companhia", "Documentos", "Pessoal",  "Endereços", "Abrangência"]

export const CompanyAsideContent: React.FunctionComponent<CompanyAsideContent.Params> = ({ company_id, onChange }) =>{
    const context = useContext(GlobalContext)
    const [ sectionIndex, setSectionIndex ] = useState(0);
    const [ company, setCompany] = useState<Companhia | null>(null)
    const dispatch = useDispatch()

    useEffect(()=>{ companhiasServices.findV2(company_id).then(setCompany) },[company_id])

    const successDialog = () => context.dialog.push(MakeNotification(() =>{ return -1 },
    [ "Salvo com sucesso!"],"Sucesso!",NotificationType.SUCCESS)) 

    return (
        <BlAsideLayout footer={<NavOptions list={labels} onChange={setSectionIndex} />} loading={false} title={labels[sectionIndex]} onClose={()=>onChange('CLOSE')}>
            { !company ? <span> Carregando... </span> :
                <React.Fragment>
                {
                    ( sectionIndex == 1 )?
                        <CompaniesDocumentsForm documents={company.documents} company_id={company_id}/>
                    : sectionIndex == 2 ?
                        <StaffContent staff={company.staff} onChange={()=>{}}></StaffContent>
                    : sectionIndex == 3 ?
                        <AddressContent addresses={company.addresses}></AddressContent>
                    : sectionIndex == 4 ?
                        <AbrangenciaForm  onAction={()=>{}} company_id={company.id}/>
                    :
                        <CompanyForm entry={company} onAction={(n: any)=>{
                            if(n == -1) return onChange('CLOSE');
                            successDialog();
                        }}></CompanyForm>
                }
                </React.Fragment>
            }
        </BlAsideLayout> 
    )
}

/* 
<PanelContainer title="Abrangência" icon={<span>&#8505;</span>}>
<AbrangenciaForm  onAction={()=>{}} company_id={company.id}/>
</PanelContainer> */
export default CompanyAsideContent