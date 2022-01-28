import React, {useContext, useEffect} from 'react'
import './style.css'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig } from 'fck-react-dialog'
/* import ImportCsvModal from "@/react-apps/components/ImportCsvModal" */
import MultiplesFormsTable from '@/react-apps/components/MultiplesFormsTable'

const TEST_DATA = [
    { specification: "esse tem que ficar aqui", outro: "asdasd", mais: "asdasda"}, {}, {}, {}, {}
]
import { CsvProdutosDTo_schema } from './schemas'

const headers = [ "EAN *", "Especificação *", "Marca *", "Categoria *", "Apresentaçao *", "NCM", "SKU"]

export const ListDepartamentosPage = () =>{

   /*  const context = useContext(GlobalContext)
    const openImportCsvModal = () =>{
        return context.dialog.push(MakeDialogConfig(ImportCsvModal,() =>{
            return -1
        }))
    } */

    return (<div>

      {/*   <button onClick={openImportCsvModal}> Importat .csv </button>  */}
        <MultiplesFormsTable 
            headers={headers} 
            dto={TEST_DATA} 
            dto_schema={CsvProdutosDTo_schema}
            onRowAction={(n)=>console.log("line:", n)}
            
        ></MultiplesFormsTable>
        
    </div>)
}


export default ListDepartamentosPage