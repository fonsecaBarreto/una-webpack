import React, { useContext, useEffect, useState } from 'react'
import "./style.css"
import TableForms from "fck-table-forms"
import CsvModal from '@/react-apps/components/ImportCsvModal'
import { UseSearchAdapter } from '@/react-apps/components/SearchAdapter'
import { ContextReplacementPlugin } from 'webpack'

import { MakeDialogConfig, MakeNotification, NotificationType } from 'fck-react-dialog'
import ImportCsvModal from '@/react-apps/components/ImportCsvModal'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { parse } from 'path'
import { suppliesServices } from '@/services/api/supplies-services'
import SuppliesCompaniesModal from './CompaniesModal'
import { GrDocumentCsv } from 'react-icons/gr'
import { MdSend } from 'react-icons/md'

const SUPPLIES_HEADER = [
    { label: "EAN", value: "ean", columns: 3 },
    { label: "Preço", value: "price", columns: 3 },
    { label: "Validade", value: "expiration", columns: 3 }
]

const CSV_HEADER = [ "ean", "price", "expiration" ]

const HISTORY_HEADER = {
    search: [ "csv" ],
    params: [ "p" ]
}

const ErrorLogPanel = ({errors}: any) =>{

    return (
    
        <div>
            { Object.keys(errors).length == 0 ? "Nenhum erro encontrado":

                <ul>
                    { 
                        Object.keys(errors).map((e:any) => {
                            const err = errors[e]
                            return (
                                <li>
                                    <span> {e}</span> 
                                    <span> {JSON.stringify(err)}</span>
                                </li>
                            )
                    })
                    }
                </ul>
            }

        </div>
    )
}
export const SuppliesContent:React.FunctionComponent<any> = ({}) =>{
 
    const context: any = useContext(GlobalContext)
    const [ initialData, setInitialData ] = useState([])
    const [ errors, setErrors ] = useState({})
    const { parsedSearch, pushToHistory } = UseSearchAdapter({ header: HISTORY_HEADER })
    const [ resultData, setResultData ] = useState(null);
    
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
                    console.log(err)
                    context.dialog.push(MakeNotification(()=>-1,["Erro inesperado"], "Falha", NotificationType.FAILURE)) 
                } 
            }
            return -1
        } ))
    }

    useEffect(()=>{
        if(parsedSearch){
            const { csv } = parsedSearch;
            if(csv.length > 0 && csv[0] == 1){ openCsvReader() }
        } 
    },[ parsedSearch]) 

    const openCsvReader = () =>{
        context.dialog.push(MakeDialogConfig(({onAction}: any)=><ImportCsvModal headers={CSV_HEADER} onAction={onAction}></ImportCsvModal>,(n:any)=> {
            if(n !== -1) { setInitialData(n); } 
            pushToHistory({ csv:null })
            return -1
        } ))
    }

    return (
        <div className='supply-register-page'> 
            <button onClick={()=>pushToHistory({"csv": 1})}> Upload CSV  <GrDocumentCsv></GrDocumentCsv></button>
            <button onClick={submit}> Enviar <MdSend></MdSend> </button>
            <TableForms errors={errors} entries={initialData} headers={SUPPLIES_HEADER} onChange={setResultData} ></TableForms>
            <ErrorLogPanel errors={errors}/>
        </div>
    )
}

export default SuppliesContent
