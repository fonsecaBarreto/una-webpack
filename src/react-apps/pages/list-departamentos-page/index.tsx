import React, {useContext} from 'react'
import './style.css'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig } from 'fck-react-dialog'
import ImportCsvModal from "@/react-apps/components/ImportCsvModal"
export const ListDepartamentosPage = () =>{

    const context = useContext(GlobalContext)
    const openImportCsvModal = () =>{
        return context.dialog.push(MakeDialogConfig(ImportCsvModal,() =>{
            return -1
        }))
    }
    return (<div>

        <button onClick={openImportCsvModal}> Importat .csv </button> 
        aqui os deparaadasd
        <div className='app-bg-test'>
            Aqui haver um teste de bg
        </div>
    </div>)
}


export default ListDepartamentosPage