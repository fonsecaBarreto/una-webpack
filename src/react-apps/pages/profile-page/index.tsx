import React, {useContext, useEffect, useState} from 'react'
import './style.css'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig } from 'fck-react-dialog'
import { Forming } from 'fck-react-input-controls'
import { Companhia } from '@/domain/views/Companhia'
import { companhiasServices } from '@/services/api/companhias-service'
import PanelContainer from '../../components/una/panel-container'
import { BsInfoCircle } from 'react-icons/bs'
import { MdGroups, MdOutlineLocationOn } from 'react-icons/md'
import { CgFileDocument } from 'react-icons/cg'
import FlexLabelColumn from '@/react-apps/components/una/panel-container/FlexLabelColumn'
import UserItem from './user-item'
import AddressItem from './address-item'
import CompanyInfoPanel from './company-info-panel'
export const CompanyProfilePage: React.FunctionComponent<any> = ({location, history, match}) =>{

    const [companhia, setCompanhia] = useState<Companhia | null>(null)
    const context = useContext(GlobalContext);

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

                <PanelContainer title="Pessoal" icon={<MdGroups/>}>
                    <div  className='company-staff-list' >
                        { companhia.pessoal.map(p=>{ return (<UserItem key={p.id} user={p}></UserItem>)}) } 
                    </div>
                </PanelContainer>

                <PanelContainer title="Endereços" icon={<MdOutlineLocationOn/>}>
                    <div  className='company-address-list' >
                        { companhia.enderecos.map(a=>{ return (<AddressItem key={a.id} address={a}></AddressItem>)}) } 
                    </div>
                </PanelContainer>

                <PanelContainer title="documentos" icon={<CgFileDocument/>}>
                    <div >
                       
                    </div>
                </PanelContainer>
          
            </div>
        </div>
    )
}

export default CompanyProfilePage