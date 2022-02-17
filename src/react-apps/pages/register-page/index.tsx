import './style.css'
import React, {useContext, useEffect, useState} from 'react'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import { product_headers_schema } from './schemas'
import { MakeDialogConfig } from 'fck-react-dialog'
import ImportCsvModal from '@/react-apps/components/ImportCsvModal'
import { GrDocumentCsv } from 'react-icons/gr'
import SwitchButton from '@/react-apps/components/una/switchButton'
import ProductsTable from './tables/products-table'
import SuplyTable from './tables/supply-table'
import { AiFillShopping } from 'react-icons/ai'
import { RiInboxArchiveFill } from 'react-icons/ri'
import { BsCloudCheckFill } from 'react-icons/bs'

export const ListDepartamentosPage = () =>{

    const [ pageIndex, setPageIndex ] = useState(0);
    const [ dataFromCsv, setDataFromCsv ] = useState<any[] | null>(null)
    const context = useContext(GlobalContext)
    const openImportCsvModal = () =>{
        return (
            context.dialog.push(MakeDialogConfig( ({onAction}) => <ImportCsvModal onAction={onAction} headers={product_headers_schema.map(v=>v.value)} />, (data: any) => {
                if(data !== -1) setDataFromCsv(data)
                return -1   
            }, "Upload produtos via .CSV"))
        )
    }

    const changePage = (n:number) =>{
        setDataFromCsv(null)
        setPageIndex(n)
    }

    return (
        <div id="add-products-page"> 
            <div className='add-products-container app-container'>
                
                <section className='add-products-nav-bar'>
                    <SwitchButton value={pageIndex} onInput={changePage}> 
                        <React.Fragment> <AiFillShopping/>  Produtos </React.Fragment>
                        <React.Fragment> <RiInboxArchiveFill/> Fornecimento </React.Fragment>
                    </SwitchButton>
                    <button className="nav-header-btn" onClick={openImportCsvModal}> <GrDocumentCsv/> Upload .CSV  </button> 
                    <button className="nav-header-btn nav-header-btn-save"> 
                        <BsCloudCheckFill/> Salvar
                     </button>
               
                </section>
        
                <section>
                    { 
                        pageIndex === 0 ? <ProductsTable override_data={dataFromCsv}></ProductsTable>
                        :  <span> Supply aqui </span> 
                    }
                    {/* <SuplyTable override_data={dataFromCsv}></SuplyTable> */}
                </section>

            </div>
        </div>
    )
}

export default ListDepartamentosPage