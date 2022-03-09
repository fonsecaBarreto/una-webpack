import React, {useContext, useEffect, useState} from 'react'
import './style.css'
import { Companhia } from '@/domain/views/Company'
import { companhiasServices } from '@/services/api/companhias-service'
import PanelContainer from '../../components/una/panel-container'
import { BsArchiveFill, BsInfoCircle } from 'react-icons/bs'
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


export const CompanyProfilePage: React.FunctionComponent<any> = ({location, history, match}) => {

    const context = useContext(GlobalContext)
    const [companhia, setCompanhia] = useState<Companhia | null>(null)
    
    const openCompanyModal = (entry: any) =>{
        return context.dialog.push(MakeDialogConfig(
            ({onAction}: any) => ( <CompanyForm  onData={UpdatedCompanhia}  onAction={onAction}  entry={entry}/>), 
            (v) =>{ history.push({ search: `` }) ;return -1 
            }, "Informações da Companhia"))
    }

    const openUserModal = (entry: any, company_id?:string) =>{

        return context.dialog.push(MakeDialogConfig(
            ({onAction}: any) => ( <UserForm company_id={company_id} entry={entry} onAction={onAction} onData={afterStaffUpdated}/> ),
            (v) =>{ history.push({ search: `` });return -1 
            }, "Usuario"))
    }

    const openAbrangenciaModal = ( company_id:string) =>{
        return context.dialog.push(MakeDialogConfig(
            ({onAction}: any) => ( <AbrangenciaForm  onAction={onAction} company_id={company_id}/>), 
            (v) =>{ history.push({ search: `` }) ;return -1 
            }, "Abrangência"))
    }

    const loadContent = async () =>{

        const { id: company_id } = match.params;

        var company: any = companhia;

        if(!company || company?.id != company_id){
            let company_data = await companhiasServices.find(company_id)
            if(company_data) {
                company = company_data;
                setCompanhia(company_data);
            }
        }
        /* Baixado as informações da Companhias, devem ser verificadas as querystrings */

        if(!company || !location.search) return
        const parsed = queryString.parse(location.search);

        if(parsed?.company){
            switch(parsed?.company){
                case "1": return  openCompanyModal(company)
            }
        } else if(parsed?.user){ /* No Usuario deve checar se ja foi baixando os dados e guardar se necessario */
            switch(parsed?.user){
                case "1": return openUserModal(null, company.id)
                default:{
                    const user_index: any = company?.staff.findIndex((u:any)=>u.id === parsed.user);
                    const staff =  company?.staff ? [ ...company?.staff] : []
                    var user_entry = (user_index === -1) ? null : ({ ...staff[user_index] } || null );
                    return openUserModal(user_entry)
                }
            }
        } else if(parsed.coverage){
            switch(parsed?.coverage){
                case "1": return openAbrangenciaModal(company.id)
            }
        }
    }

    useEffect(()=>{ loadContent() },[ location.pathname, location.search ])
    
    const UpdatedCompanhia = (data: any) =>{ setCompanhia(prev=>({ ...prev, ...data })) }
    const afterStaffUpdated = (data: any) =>{  }
    
    if(companhia === null) return <LoadingPage/>
    return (
        <div id="company-profile-page"> 
            <div className='company-container app-container'>

                <PanelContainer 
                    title="Informações da Companhia"  icon={<BsInfoCircle/>} 
                    headerButtons={[
                        { content: <BiCurrentLocation/>, onClick: () => history.push({ search: `?coverage=${1}` }) },
                        { content: <RiFileEditFill/>, onClick: () => history.push({ search: `?company=${1}` }) }
                        ]}>
                    <CompanyInfoPanel company={companhia}></CompanyInfoPanel>
                </PanelContainer> 

                <PanelContainer 
                    title="Pessoal" icon={<MdGroups/>} 
                    headerButtons={[{ onClick: () => history.push({ search: `?user=${1}` }), content: <AiFillPlusCircle/> }]}>
                   <CompanyStaffPanel staff={companhia.staff} onItemClick={(user_id: string) =>  history.push({ search: `?user=${user_id}`}) }></CompanyStaffPanel>
                </PanelContainer> 

               <PanelContainer 
                    title="Endereços" icon={<MdOutlineLocationOn/> } >
                    <CompanyAddressesPanel addresses={companhia.addresses }></CompanyAddressesPanel>
                </PanelContainer>

                <PanelContainer title="documentos" icon={<CgFileDocument/>}>
                    <CompanyFilesPanel documents={companhia?.documents} company_id={companhia.id}></CompanyFilesPanel>
                </PanelContainer>  
           
            </div>
        </div>
    )
}

export default CompanyProfilePage