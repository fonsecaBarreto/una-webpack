import React, {useContext, useEffect, useState} from 'react'
import './style.css'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig } from 'fck-react-dialog'
import { Forming } from 'fck-react-input-controls'
import { Companhia } from '@/domain/views/Company'
import { companhiasServices } from '@/services/api/companhias-service'
import PanelContainer from '../../components/una/panel-container'
import { BsInfoCircle } from 'react-icons/bs'
import { MdGroups, MdOutlineLocationOn } from 'react-icons/md'
import { CgFileDocument } from 'react-icons/cg'
import UserItem from './user-item'
import AddressItem from './address-item'
import CompanyInfoPanel from './company-info-panel'
import UserFileItem from './UserFileItem'
import LoadingPage from "@/react-apps/components/una/Loading/presentation/LoadingPage"
import CompanyForm from "@/react-apps/forms/CompanyForm"
import { FiEdit } from 'react-icons/fi'
const COMPANY_DOCUMENT_SPECIFICATION = "* Arquivos em PDF com tamanho maximo de 9.537 Mb."

const EditTollBar = ({company}:{company: any}) =>{
    const context = useContext(GlobalContext)
    const editCompany = () =>{
        return context.dialog.push(MakeDialogConfig(() =><CompanyForm entry={company} />, () =>{}, "Editar Companhia"))
    }
    return (
        <React.Fragment>
            <button onClick={editCompany}> <FiEdit/> </button>
        </React.Fragment>
    )
}

export const CompanyProfilePage: React.FunctionComponent<any> = ({location, history, match}) =>{

    const [companhia, setCompanhia] = useState<Companhia | null>(null)
    
    useEffect(()=>{
        const { id: companhia_id } = match.params
        companhiasServices.find(companhia_id)
        .then(company=>{ setCompanhia(company) })
        .catch(err =>{ console.log(err) })
      },[location.pathname])

    if(companhia === null) return <LoadingPage/>
    return (
        <div id="company-profile-page"> 
            <div className='company-container app-container'>

                <PanelContainer title="Informações da Companhia" icon={<BsInfoCircle/>} headerContent={<EditTollBar company={companhia}></EditTollBar>}>
                    <CompanyInfoPanel company={companhia}></CompanyInfoPanel>
                </PanelContainer>

                <PanelContainer title="documentos" icon={<CgFileDocument/>}>
                    
                    <UserFileItem company_id={companhia.id}
                        name="contrato_social" label={"Contrato Social"} placeHolder={COMPANY_DOCUMENT_SPECIFICATION}
                        entry={companhia?.documents.contrato_social}/>

                    <UserFileItem company_id={companhia.id}
                        name="inscricao_estadual" label={"Inscrição Estadual"} placeHolder={COMPANY_DOCUMENT_SPECIFICATION}
                        entry={companhia?.documents.inscricao_estadual}/>
                 
                </PanelContainer>

                <PanelContainer title="Pessoal" icon={<MdGroups/>}>
                    <div  className='company-staff-list' >
                        { companhia.staff.map(p=>{ return (<UserItem key={p.id} user={p}></UserItem>)}) } 
                    </div>
                </PanelContainer>

                <PanelContainer title="Endereços" icon={<MdOutlineLocationOn/>}>
                    <div  className='company-address-list' >
                        { companhia.addresses.map(a=>{ return (<AddressItem key={a.id} address={a}></AddressItem>)}) } 
                    </div>
                </PanelContainer>

            </div>
        </div>
    )
}

export default CompanyProfilePage