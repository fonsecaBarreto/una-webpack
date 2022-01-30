import './style.css'
import React, {useContext, useEffect, useState} from 'react'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { CsvProdutosDTo_schema } from './schemas'
import { MakeDialogConfig, OnActionFunction } from 'fck-react-dialog'
import ImportCsvModal from '@/react-apps/components/ImportCsvModal'
import MultiplesForms from '@/react-apps/components/MultiplesForms'

const table_headers: MultiplesForms.Header[] = [   
    { label: "EAN *", value: "ean", type: "text" }, 
    { label: "Especificação *", value: "specification" },
    { label: "Marca *", value: "brand", type:"select", list:[ {value: "some_id", label:"Nestle"}, {value: "another_id", label:"Macuco"}] },
    { label: "Categoria *", value: "category",   type:"select", list:[ {value: "some_id", label:"Categoria tal"}, {value: "another_id", label:"Outra Categoria"}]   },
    { label: "Apresentaçao *", value: "presentation",  type:"select", list:[ {value: "some_id", label:"1Kg"}, {value: "another_id", label:"300g"}] },
    { label: "NCM", value: "ncm" },
    { label: "SKU", value: "sku" }
]

export const ListDepartamentosPage = () =>{

    const [ productData, setProductData ] = useState<any[]>([])
    const context = useContext(GlobalContext)

    const openImportCsvModal = () =>{
        return (
            context.dialog.push(MakeDialogConfig( ({onAction}) => <ImportCsvModal onAction={onAction} headers={table_headers.map(v=>v.value)} />, (data: any) => {
                if(data !== -1) setProductData(data)
                return -1   
            }, "Upload produtos via .CSV"))
         )
    }

    const addBlankData = () =>{
        return setProductData((prev: any)=> [{}, ...prev] ) 
    }

    return (
        <div id="add-products-page"> 
            <div className='add-products-container app-container'>

                <section>
                    <button onClick={openImportCsvModal}> Upload .CSV</button> 
                    <button onClick={openImportCsvModal}> Fornecimento .CSV</button> 
                </section>
              
                <section>
                    <MultiplesForms schema={CsvProdutosDTo_schema} headers={table_headers} entry={productData} dialogContext={context.dialog}></MultiplesForms>
                    <button onClick={addBlankData}> Novo </button>
                </section>

                <section>
                    <button> Salvar </button>

                </section>

            </div>
        </div>
    )
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

  
  

 */