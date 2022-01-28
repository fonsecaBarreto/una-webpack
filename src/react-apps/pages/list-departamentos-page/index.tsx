import React, {useContext, useEffect} from 'react'
import './style.css'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig } from 'fck-react-dialog'
import MultiplesFormsTable from '@/react-apps/components/MultiplesFormsTable'
import { CsvProdutosDTo_schema } from './schemas'
import NewProductModal from './NewProductModal'


const TEST_DATA = [
    { specification: "asdasd", outor:"asdasd"}, {brand_name: "Um nome ai"}, {}, {}, {}
]

const headers = [   { label: "EAN *", value: "ean"}, 
                    { label: "Especificação *", value: "specification"},
                    { label: "Marca *", value: "brand_name"},
                    { label: "Categoria *", value: "category_name"},
                    { label: "Apresentaçao *", value: "presentation_name"},
                    { label: "NCM", value: "ncm"},
                    { label: "SKU", value: "sku"}]

export type ProdutoDto = {
    ean: string, 
    ncm: string, 
    sku: string, 
    specification: string, 
    brand_name: string, 
    category_name: string, 
    presentation_name: string 
}

export const ListDepartamentosPage = () =>{

    const context = useContext(GlobalContext)

    const handleTableAction = (line: number, payload: { data: any, errors: any, oninput: Function }) =>{
        var dto:any ={ ...payload.data }
        return context.dialog.push(MakeDialogConfig(()=><NewProductModal dto={dto}/>,() =>{
            return -1
        }))
    }

    return (<div>

        {/*   <button onClick={openImportCsvModal}> Importat .csv </button>  */}
        <MultiplesFormsTable 
            headers={headers} 
            dto={TEST_DATA} 
            dto_schema={CsvProdutosDTo_schema}
            onRowAction={handleTableAction}
            
        ></MultiplesFormsTable>
        
    </div>)
}


export default ListDepartamentosPage