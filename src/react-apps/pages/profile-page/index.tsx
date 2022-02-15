import React, {useContext, useEffect, useState} from 'react'
import './style.css'
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
import { IoMdAddCircleOutline } from 'react-icons/io'
import UserForm from '@/react-apps/forms/UserForm'
import AddressForm from '@/react-apps/forms/AddressForm'
import { RiFileEditFill } from 'react-icons/ri'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, OnActionFunction } from 'fck-react-dialog'
import queryString from 'query-string'

const COMPANY_DOCUMENT_SPECIFICATION = "* Arquivos em PDF com tamanho maximo de 9.537 Mb."

export const CompanyProfilePage: React.FunctionComponent<any> = ({location, history, match}) => {

    const context = useContext(GlobalContext)
    const [companhia, setCompanhia] = useState<Companhia | null>(null)
    
    const openCompanyModal = (entry: any) =>{
        return context.dialog.push(MakeDialogConfig(
            ({onAction}: any) => ( <CompanyForm  onData={UpdatedCompanhia}  onAction={onAction}  entry={entry}/>), 
            (v) =>{ history.push({ search: `` }) ;return -1 
            }, "Informações da Companhia"))
    }

    const openUserModal = (entry: any) =>{
        return context.dialog.push(MakeDialogConfig(
            ({onAction}: any) => ( <UserForm entry={entry} onAction={onAction} onData={afterStaffUpdated}/> ),
            (v) =>{ history.push({ search: `` });return -1 
            }, "Usuario"))
    }

    const loadContent = async () =>{

        const { id: company_id } = match.params;

        var company: any = companhia;

        if(!company || company?.id != company_id){
            let company_data = await companhiasServices.find(company_id)
            if(company_data) {
                company = company_data
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
        } else if(parsed?.user){
            /* No Usuario deve checar se ja foi baixando os dados e guardar se necessario */
            switch(parsed?.user){
                case "1": return openUserModal(null)
                default:{
                    const user_index: any = company?.staff.findIndex((u:any)=>u.id === parsed.user);
                    const staff =  company?.staff ? [ ...company?.staff] : []
                    var user_entry = (user_index === -1) ? null : ({ ...staff[user_index], roles: [] } || null );
                    return openUserModal(user_entry)
                }
            }
        }
    }

    useEffect(()=>{ loadContent() },[location.pathname, location.search])
    
    const UpdatedCompanhia = (data: any) =>{ setCompanhia(prev=>({ ...prev, ...data })) }
    const afterStaffUpdated = (data: any) =>{  }
    
    if(companhia === null) return <LoadingPage/>
    return (
        <div id="company-profile-page"> 
            <div className='company-container app-container'>

                <PanelContainer title="Informações da Companhia" icon={<BsInfoCircle/>} 
                    headerButtons={[{ content: <RiFileEditFill/>, onClick: () => history.push({ search: `?company=${1}` }) }]}>
                    <CompanyInfoPanel company={companhia}></CompanyInfoPanel>
                </PanelContainer>

                <PanelContainer title="Pessoal" icon={<MdGroups/>} 
                    headerButtons={[{ onClick: () => history.push({ search: `?user=${1}` }), content: <IoMdAddCircleOutline/> }]}>
                    <div className='company-staff-list' >
                        {   
                            companhia.staff.map(p=>{ return (
                            <UserItem key={p.id} user={p} 
                                onClick={() =>  history.push({ search: `?user=${p.id}` })}>
                            </UserItem>)}) 
                        } 
                    </div>
                </PanelContainer> 

               <PanelContainer title="Endereços" icon={<MdOutlineLocationOn/> } >
                    <div  className='company-address-list' >
                        { companhia.addresses.map(a=>{ return (<AddressItem key={a.id} address={a}></AddressItem>)}) } 
                    </div>
                </PanelContainer>

                <PanelContainer title="documentos" icon={<CgFileDocument/>}>
                    <UserFileItem company_id={companhia.id}
                        name="contrato_social" label={"Contrato Social"} placeHolder={COMPANY_DOCUMENT_SPECIFICATION}
                        entry={companhia?.documents.contrato_social}/>
                    <UserFileItem company_id={companhia.id}
                        name="inscricao_estadual" label={"Inscrição Estadual"} placeHolder={COMPANY_DOCUMENT_SPECIFICATION}
                        entry={companhia?.documents.inscricao_estadual}/>
                </PanelContainer> 

            </div>
        </div>
    )
}

export default CompanyProfilePage