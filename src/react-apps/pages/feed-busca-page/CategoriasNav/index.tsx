import React, { useState, useEffect } from 'react'
import './style.css'
import SelectorNav, { SelectionControl } from '../../../components/SelectorNav/SelectionControl'
import Asidefilters from '@/react-apps/layouts/components/AsideFilters'
import { INITIAL_DEPARTAMENTOS, MartState, ProductsState } from '@/react-apps/store/reducers/mart'
import { SearchControl } from '@/react-apps/components/SelectorNav'

export namespace CategoriasNav {
    export type Params = {
        loading: boolean,
        onChange: Function, 
        departaments_struct: MartState.CategoriesLike,
        brands_available: string[]
    }
}

const INITIAL_FILTERS: ProductsState.Filters = { departament: [], category: [], subCategory: [],  brand: [], v: ""}

export const CategoriasNav: React.FunctionComponent<CategoriasNav.Params> = ({ loading, onChange, departaments_struct, brands_available=[] }) => {
    if(!loading) return <span> Loading...</span>
    
    const [ count, setCount ] = useState(0);
    const [ filters, setFilters ] = useState<ProductsState.Filters | any>({ ...INITIAL_FILTERS });
  
    useEffect(()=>{ 
        if(count === 0) { return setCount(1) } 
        onChange(filters); 
    },[filters])

    return (
        <Asidefilters>

            <SearchControl initial_value={filters["v"]} title="Pesquisa" onClick={ (v:any) => setFilters((prev:any)=>({...prev, v}))}/>
            {/* Criar um generalização para o que esconder */}
            <SelectorNav 
                title="Departamentos" 
                initial_value={ filters["departament"]}
                onChange={(payload: any)=>setFilters((prev:any)=>({...prev, "departament": payload })) }  
                items={departaments_struct.departaments}></SelectorNav>

            <SelectorNav 
                showChildrenFrom={[filters["departament"]]} // Deve esconder itens que 
                title="Categorias" 
                initial_value={filters["category"]}
                onChange={(payload: any)=>setFilters((prev:any)=>({...prev, "category": payload })) }  
                items={departaments_struct.categories}></SelectorNav>

            <SelectorNav 
                showChildrenFrom={[filters["category"], filters["departament"]]}
                title="Sub Categorias" 
                initial_value={filters["subCategory"]}
                onChange={(payload: any)=>setFilters((prev:any)=>({...prev, "subCategory": payload })) }  
                items={departaments_struct.subCategories}></SelectorNav> 

            <SelectorNav  
                showValuesFrom={brands_available}
                title="Marcas"  
                initial_value={filters["brand"]}
                onChange={(payload: any)=>setFilters((prev:any)=>({...prev, "brand": payload })) }  
                items={departaments_struct.brands}></SelectorNav>  

        </Asidefilters>
    )
}
export default CategoriasNav
