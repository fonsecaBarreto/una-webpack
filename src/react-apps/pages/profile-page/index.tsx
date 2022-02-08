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
const COMPANY_DOCUMENT_SPECIFICATION = "* Arquivos em PDF com tamanho maximo de 9.537 Mb."
export const CompanyProfilePage: React.FunctionComponent<any> = ({location, history, match}) =>{

    const [companhia, setCompanhia] = useState<Companhia | null>(null)
    const context = useContext(GlobalContext)

    useEffect(()=>{
        const { id: companhia_id } = match.params
        console.log(companhia_id)
        companhiasServices.find(companhia_id)
        .then(company=>{ 
            console.log("upcomming company", company)
            setCompanhia(company) })
        .catch(err =>{ console.log(err) })
        
      },[location.pathname])

    if(companhia === null) return <span>"Carregando..."</span>
    return (
        <div id="company-profile-page"> 
            <div className='company-container app-container'>
                
                <PanelContainer title="Informações da Companhia" icon={<BsInfoCircle/>}>
                    <CompanyInfoPanel company={companhia}></CompanyInfoPanel>
                </PanelContainer>

                <PanelContainer title="documentos" icon={<CgFileDocument/>}>
                
                    <UserFileItem 
                        name="contrato_social" label={"Contrato Social"} placeHolder={COMPANY_DOCUMENT_SPECIFICATION}
                        entry={companhia?.documents.contrato_social}/>

                    <UserFileItem 
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