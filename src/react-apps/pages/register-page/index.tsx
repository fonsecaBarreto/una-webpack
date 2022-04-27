import './style.css'
import React, {useContext, useEffect, useReducer, useRef, useState} from 'react'
import Softpages, { PageWrapper } from "@/react-apps/components/una/SoftPages"

import SuppliesContent from './content/Supplies'
import BrandsContent from './content/Brands'
import ProductsContent from './content/Products'
import UseSearchAdapter from '@/react-apps/components/SearchAdapter'
import { MakeDialogConfig } from 'fck-react-dialog'
import ImportCsvModal from '@/react-apps/components/ImportCsvModal'

const ITEMS = [
    { value: "supplies", label: "Fornecimento" },
   /*  { value: "products", label: "Produtos" },
    { value: "categories", label: "Categorias" },
    { value: "presentations", label: "Apresentações" },
    { value: "brands", label: "Marcas" }, */
]

const HISTORY_HEADER = {
    search: [ "csv" ],
    params: [ "p" ]
}

export const RegisterPage: React.FunctionComponent<any> = ({history}) =>{
    const searchAdapter = UseSearchAdapter({ header: HISTORY_HEADER })
    const { pushToHistory, parsedParams, parsedSearch } = searchAdapter 
    const handlePageSection = (e: any) => pushToHistory({ p:[e.target.value]}) 
    const handleChange = (k: any) => { pushToHistory({[k]: 1})}
    useEffect(()=>{ pushToHistory({p:[ITEMS[0].value]})},[])
    return (
        <React.Fragment>
            { !parsedParams ? <span> Carregando... </span> :
            <div id="adm-register-page"> 
                <div className='adm-register-page-container app-container'>
                    <header>
                        <select value={parsedParams["p"]} onChange={handlePageSection}>
                            {ITEMS.map((p: any, i:number)=>{
                                return ( <option key={i} value={p.value}>{p.label}</option>)
                            })}
                        </select>
                    </header>
                    <section className='adm-register-page-content'>
                        <Softpages page={parsedParams["p"]}>
                            <PageWrapper name="supplies" title="Fornecimento" 
                                options={[{value: "csv", label:"upload .CSV"}]} onChange={handleChange}>
                                <SuppliesContent/> 
                            </PageWrapper>
                        </Softpages>
                    </section> 
                </div>  
            </div>}
        </React.Fragment>
    )
}

export default RegisterPage

{/* 

<PageWrapper name="products" title="Produtos">
                                <ProductsContent /> 
                            </PageWrapper>
                            <PageWrapper name="brands" title="Marcas">
                                <BrandsContent/>
                            </PageWrapper>


 */}
