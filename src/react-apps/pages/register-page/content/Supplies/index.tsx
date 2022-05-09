import React, { useContext, useEffect, useState } from 'react'
import TableForms from "fck-table-forms"
import { MakeDialogConfig, MakeNotification, NotificationType } from 'fck-react-dialog'
import { GlobalContext } from "@main/app"
import { suppliesServices } from '@/services/api/supplies-services'
import SuppliesCompaniesModal from './CompaniesModal'
import { CSV_HEADER, SUPPLIES_TABLE_HEADER } from "./schemas"
import ImportCsvModal from '@/react-apps/components/ImportCsvModal'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'

export const AddSuppliesTable:React.FunctionComponent<any> = ({onChange}) =>{

    const context: any = useContext(GlobalContext)
    const [ initialData, setInititalData ] = useState<any>([])
    const [ errors, setErrors ] = useState<any>(null)
    const [ resultData, setResultData ] = useState(null);
    const { parsedSearch, appendToHistory } = UseSearchAdapter({header: { search: ["o"]}})

    //useEffect(()=> { if(parsedSearch?.o[0] == "CSV"){ openImportCsvModal()} },[parsedSearch])

    const openImportCsvModal = () =>{
        return (
            context.dialog.push(MakeDialogConfig( ({onAction}) => <ImportCsvModal onAction={onAction} headers={CSV_HEADER} />, (data: any) => {
                if(data !== -1) { setInititalData(data)}
                //appendToHistory({o:[]});
                return -1;
            }, "Upload produtos via .CSV"))
        )
    }

    const handleTableData = (data: any) => {
        setResultData(data)
        setInititalData(null)
        setErrors(null) 
    }

    const submit =async() => {
        context.dialog.push(MakeDialogConfig(({onAction}: any)=><SuppliesCompaniesModal onAction={onAction}></SuppliesCompaniesModal>, async (n:any)=> {
            if(n !== -1) { 
              try{
                    const supplies : any = resultData;
                    const { results, conflicts } = await suppliesServices.save_multiples({ supplies }, n)
                    if(Object.keys(conflicts).length > 0)   {
                        setErrors(conflicts)
                        context.dialog.push(MakeNotification(()=>-1,["Encontramos alguns erros nas informações recebidas"], "Atenção", NotificationType.FAILURE)) 
                    }else{
                        setErrors({})
                        context.dialog.push(MakeNotification(()=>-1,["Fornecimento atualizado com sucesso"], "Sucesso", NotificationType.SUCCESS)) 
                    }
                }catch(err){
                    context.dialog.push(MakeNotification(()=>-1,["Erro inesperado"], "Falha", NotificationType.FAILURE)) 
                } 
            }
            return -1
        } ))
    }

    return (
        <React.Fragment>
            <button onClick={openImportCsvModal}> Upload Csv </button>
            <button onClick={submit}> Salvar </button>
           <TableForms errors={errors} entries={initialData} headers={SUPPLIES_TABLE_HEADER} onChange={handleTableData} ></TableForms>
        </React.Fragment>
    )
}

export const ListSupplies : React.FunctionComponent<any> = () =>{
    return (
        <div> teste </div>
    )
}

