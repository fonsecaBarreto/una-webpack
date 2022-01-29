import React, {useContext, useEffect, useState} from 'react'
import './style.css'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { MakeDialogConfig, OnActionFunction } from 'fck-react-dialog'
import MultiplesFormsTable from '@/react-apps/components/MultiplesFormsTable'
import { CsvProdutosDTo_schema } from './schemas'
import NewProductModal from './NewProductModal'
import { MultiplesFormsTableRow } from '@/react-apps/components/MultiplesFormsTable/Rows'
import ImportCsvModal from '@/react-apps/components/ImportCsvModal'
import MultiplesForms from '@/react-apps/components/MultiplesForms'

const headers: MultiplesForms.Header[] = [   
    { label: "EAN *", value: "ean", type: "text" }, 
    { label: "Especificação *", value: "specification" },
    { label: "Marca *", value: "brand", type:"select", list:[ {value: "some_id", label:"Nestle"}, {value: "another_id", label:"Macuco"}] },
    { label: "Categoria *", value: "category",   type:"select", list:[ {value: "some_id", label:"Categoria tal"}, {value: "another_id", label:"Outra Categoria"}]   },
    { label: "Apresentaçao *", value: "presentation",  type:"select", list:[ {value: "some_id", label:"1Kg"}, {value: "another_id", label:"300g"}]   },
    { label: "NCM", value: "ncm" },
    { label: "SKU", value: "sku" }]

const initial_data = [
    { ean: "asdasdasd", specification: "Aqui uma espec", brand_name: "nestle"}, { outro: "asdasd", presentation_name: "1Kg"}
]
export const ListDepartamentosPage = () =>{

    const [ productData, setProductData ] = useState(initial_data)
    const context = useContext(GlobalContext)

    return (<div> 
            <MultiplesForms schema={CsvProdutosDTo_schema} headers={headers} entry={productData} dialogContext={context.dialog}></MultiplesForms>
        </div>)
}

export default ListDepartamentosPage



  /*  


  export type ProdutDto = {
    ean: string, 
    ncm: string, 
    sku: string, 
    specification: string, 
    brand_name: string, 
    category_name: string, 
    presentation_name: string 
}

    const handleTableAction: MultiplesFormsTableRow.ActionHandler = (line, payload) =>{

        const { data, errors, onEntry } = payload
   
        const handleModalEntry =(product: any) =>{
            console.log(product)
            onEntry(line, product)
        }

        var dto:any ={ ...payload.data }
        return context.dialog.push(MakeDialogConfig( ({onAction})=><NewProductModal onAction={onAction} dto={dto} onchange={handleModalEntry}/>,() =>{
            return -1
        }))
    }

   <button onClick={openImportCsvModal}> Importat .csv </button> 
        <MultiplesFormsTable 
            headers={headers} 
            initial_dtos={productData} 
            dto_schema={CsvProdutosDTo_schema}
            onRowAction={handleTableAction}
        ></MultiplesFormsTable>
  
  
  
  const openImportCsvModal = () =>{
        return (
            context.dialog.push(MakeDialogConfig( ({onAction}) => <ImportCsvModal onData={setProductData} onAction={onAction}/>, () => -1))
        )
    }
 */