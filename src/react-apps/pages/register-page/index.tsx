import './style.css'
import React, {useContext, useEffect, useReducer, useRef, useState} from 'react'
import GlobalContext from "@/react-apps/apps/main/global-components-context"
import Softpages, { PageWrapper } from "@/react-apps/components/una/SoftPages"

const ITEMS = [
   { value: "products", label: "Produtos" },
   { value: "supplies", label: "Fornecimento" },
   { value: "categories", label: "Categorias" },
   { value: "presentations", label: "Apresentações" },
   { value: "brands", label: "Marcas" },
]

import SuppliesContent from './content/Supplies'
import BrandsContent from './content/Brands'
import ProductsContent from './content/Products'
export const RegisterPage: React.FunctionComponent<any> = ({history}) =>{

    const [ pageKey, setPageKey ] = useState("supplies");
    const context = useContext(GlobalContext)
    const handleInput = (e: any) => { setPageKey(e.target.value) }

    return (
        <div id="adm-register-page"> 
           <div className='adm-register-page-container app-container'>
                 <header>
                    <select value={pageKey} onChange={handleInput}>
                        {ITEMS.map((p: any, i:number)=>{
                            return ( <option value={p.value}>{p.label}</option>)
                        })}
                    </select>
                </header>
                <section className='adm-register-page-content'>
                    <Softpages page={pageKey}>
                        <PageWrapper name="products" title="Produtos">
                            <ProductsContent /> 
                        </PageWrapper>
                        <PageWrapper name="supplies" title="Fornecimento">
                            <SuppliesContent/>
                        </PageWrapper>
                        <PageWrapper name="brands" title="Marcas">
                            <BrandsContent/>
                        </PageWrapper>
                    </Softpages>
                </section> 
            </div> 
        </div>
    )
}

export default RegisterPage

{/* <select>
{METHODS.map((p: any, i:number)=>{
    return ( <option value={p.value}>{p.label}</option>)
})}
</select>
 */}
