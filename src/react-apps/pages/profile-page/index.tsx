import React, {useContext, useEffect, useState} from 'react'
import './style.css'
import { Companhia } from '@/domain/views/Company'
import { companhiasServices } from '@/services/api/companhias-service'
import PanelContainer from '../../components/una/panel-container'
import { BsInfoCircle } from 'react-icons/bs'
import { MdGroups, MdOutlineLocationOn } from 'react-icons/md'
import { CgFileDocument } from 'react-icons/cg'
import CompanyAddressesPanel from './company-addresses-panel'
import CompanyInfoPanel from './company-info-panel'
import LoadingPage from "@/react-apps/components/una/Loading/presentation/LoadingPage"
import CompanyForm from "@/react-apps/forms/CompanyForm"
import UserForm from '@/react-apps/forms/UserForm'
import { RiFileEditFill, RiSearch2Fill } from 'react-icons/ri'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, OnActionFunction } from 'fck-react-dialog'
import queryString from 'query-string'
import CompanyStaffPanel from './company-staff-panel'
import CompanyFilesPanel from './company-files-panel'
import { AiFillPlusCircle } from 'react-icons/ai'
import { BiCurrentLocation } from 'react-icons/bi'
import AbrangenciaForm from '@/react-apps/forms/AbrangenciaForm'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import { LoadingComponent } from 'fck-components/lib/utils'

const SEARCH_HEADER = {
    params: [ "company_id"],
    search: []
}

export const CompanyProfilePage: React.FunctionComponent<any> = ({location, history, match}) => {

    const context = useContext(GlobalContext)
    const [company, setCompany] = useState<Companhia | null>(null)
    const { parsedParams, parsedSearch, pushToHistory } = UseSearchAdapter({header: SEARCH_HEADER})
    
    useEffect(()=>{
        if(!parsedParams) return;
        const { company_id } = parsedParams;
        companhiasServices.find(company_id).then(setCompany)
    },[parsedParams])
    return (
        <div id="company-profile-page"> 
            <div className='company-container app-container'>

                    { (!company) ? <LoadingPage></LoadingPage> : 
                        <React.Fragment>

                            <PanelContainer title="Informações da Companhia"  icon={<BsInfoCircle/>} 
                                headerButtons={[
                                    { content: <BiCurrentLocation/>, onClick: () => history.push({ search: `?coverage=${1}` }) },
                                    { content: <RiFileEditFill/>, onClick: () => history.push({ search: `?company=${1}` }) }
                                    ]}>

                                <CompanyInfoPanel company={company}></CompanyInfoPanel>
                            </PanelContainer> 

                            <PanelContainer title="Pessoal" icon={<MdGroups/>} 
                                headerButtons={[{ onClick: () => history.push({ search: `?user=${1}` }), content: <AiFillPlusCircle/> }]}>
                                <CompanyStaffPanel staff={company.staff} onItemClick={(user_id: string) =>  history.push({ search: `?user=${user_id}`}) }></CompanyStaffPanel>
                            </PanelContainer> ]

                        </React.Fragment>
                        
                    }
                {/*}




<PanelContainer title="documentos" icon={<CgFileDocument/>}>
<CompanyFilesPanel documents={companhia?.documents} company_id={companhia.id}></CompanyFilesPanel>
</PanelContainer>   */}
           
            </div>
        </div>
    )
}

export default CompanyProfilePage