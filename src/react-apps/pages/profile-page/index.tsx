import React, {useContext, useEffect, useRef, useState} from 'react'
import './style.css'
import { Companhia } from '@/domain/views/Company'
import { companhiasServices } from '@/services/api/companhias-service'
import PanelContainer from '../../components/una/panel-container'
import { BsInfoCircle } from 'react-icons/bs'
import { MdGroups } from 'react-icons/md'
import { CgFileDocument } from 'react-icons/cg'
import CompanyInfoPanel from './company-info-panel'
import LoadingPage from "@/react-apps/components/una/Loading/presentation/LoadingPage"
import CompanyForm from "@/react-apps/forms/CompanyForm"
import UserForm from '@/react-apps/forms/UserForm'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig } from 'fck-react-dialog'
import CompanyStaffPanel from './company-staff-panel'
import CompanyFilesPanel from './company-files-panel'
import { AiFillPlusCircle } from 'react-icons/ai'
import { HiDotsCircleHorizontal } from 'react-icons/hi'
import AbrangenciaForm from '@/react-apps/forms/AbrangenciaForm'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'

const SEARCH_HEADER = {
    params: [ "company_id", ],
    search: [ 'edit', 'newuser', 'edituser']
}

export const CompanyProfilePage: React.FunctionComponent<any> = ({location, history, match}) => {

    const context = useContext(GlobalContext)
    const [ company, setCompany ] = useState<Companhia | null>(null)
    const { parsedParams, parsedSearch, pushToHistory } = UseSearchAdapter({header: SEARCH_HEADER})
    const company_idRef = useRef(null)

    useEffect(()=>{
        if(!parsedParams) return;
        const { company_id } = parsedParams;
        if(company_idRef.current !== company_id) {
            company_idRef.current = company_id;
            companhiasServices.find(company_id).then(setCompany);
        }
    },[parsedParams])

    useEffect(()=>{
        if(!parsedSearch) return;
        const { edit, newuser, edituser } = parsedSearch;
        if(edit[0] == '1') { openCompanyModal(company) }
        if(newuser[0] == '1'){ openUserModal(null, company?.id)}
        if(edituser.length > 0){ 
            const user_index: any = company?.staff.findIndex((u:any)=>u.id === edituser[0]);
            const staff =  company?.staff ? [ ...company?.staff] : []
            var user_entry = (user_index === -1) ? null : ({ ...staff[user_index] } || null );
            return openUserModal(user_entry)
        }
    },[parsedSearch])

    const openCompanyModal = (entry: any) =>{
        return context.dialog.push(MakeDialogConfig( ({onAction}: any) => ( 
            <CompanyForm  onData={()=>{}} onAction={onAction} entry={entry}/>), 
            (v) =>{ pushToHistory({ edit: null }); return -1; }, "Informações da Companhia"))
    }

    const openUserModal = (entry: any, company_id?:string) =>{
        return context.dialog.push(MakeDialogConfig( ({onAction}: any) => (
            <UserForm company_id={company_id} entry={entry} onAction={onAction} /> ),
            (v) => { pushToHistory({ newuser: null, edituser: null }); return -1; }, "Usuario"))
    }

    return (
        <div id="company-profile-page"> 
            <div className='company-container app-container'>
                { (!company) ? <LoadingPage></LoadingPage> : 
                    <React.Fragment>
                        <PanelContainer title="Informações da Companhia"  icon={<BsInfoCircle/>} 
                            headerButtons={[ { content: <HiDotsCircleHorizontal/>, onClick: () => history.push({ search: `?edit=${1}` }) }]}>
                            <CompanyInfoPanel company={company}></CompanyInfoPanel>
                        </PanelContainer> 
                        <PanelContainer title="Pessoal" icon={<MdGroups/>} 
                            headerButtons={[{ onClick: () => history.push({ search: `?newuser=${1}` }), content: <AiFillPlusCircle/> }]}>
                            <CompanyStaffPanel staff={company.staff} onItemClick={(user_id: string) =>  history.push({ search: `?edituser=${user_id}`}) }></CompanyStaffPanel>
                        </PanelContainer>
                        <PanelContainer title="documentos" icon={<CgFileDocument/>}>
                            <CompanyFilesPanel documents={company?.documents} company_id={company.id}></CompanyFilesPanel>
                        </PanelContainer>
                        <PanelContainer title="Abrangência" icon={<CgFileDocument/>}>
                            <AbrangenciaForm  onAction={()=>{}} company_id={company.id}/>
                        </PanelContainer>
                    </React.Fragment> 
                }
            </div>
        </div>
    )
}

export default CompanyProfilePage;