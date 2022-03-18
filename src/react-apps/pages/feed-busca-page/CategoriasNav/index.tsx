import React, { useState, useEffect } from 'react'
import './style.css'
import SelectorNav, { SelectionControl } from '../../../components/SelectorNav/SelectionControl'
import Asidefilters from '@/react-apps/layouts/components/AsideFilters'
import { INITIAL_DEPARTAMENTOS, MartState, ProductsState } from '@/react-apps/store/reducers/mart'
import { SearchControl } from '@/react-apps/components/SelectorNav'
import { IgnorePlugin } from 'webpack'

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
    var [departaments_available, setDepartaments_available ] = useState<string[]>([])
    var [categories_available, setCategories_available ] = useState<string[]>([])

    useEffect(()=>{ setDepartaments_available((filters["departament"].map((j:any)=>j.value)))},[filters['departament']])

    useEffect(()=>{ 
        var cat = departaments_struct["categories"].filter((c: any)=>(
                ( departaments_available.length == 0 || departaments_available.includes(c.parent_id) )
                && 
                (filters["category"].length == 0 || filters["category"].map((v:any)=>v.value).includes(c.value) ))
        ).map((v:any)=>v.value)
        setCategories_available(cat);
    },[ filters['category'], departaments_available])

    useEffect(()=>{ 
        if(count === 0) { return setCount(1) } 
        onChange(filters); 
    },[filters])

    return (
        <Asidefilters>

            <SearchControl initial_value={filters["v"]} title="Pesquisa" onClick={ (v:any) => setFilters((prev:any)=>({...prev, v}))}/>

            <SelectorNav 
                title="Departamentos" 
                initial_value={ filters["departament"]}
                onChange={(payload: any)=>setFilters((prev:any)=>({...prev, "departament": payload })) }  
                items={departaments_struct.departaments}></SelectorNav>

            <SelectorNav 
                filter={[(item:any) =>(departaments_available.length == 0 ) || departaments_available.includes(item.parent_id), departaments_available.length ]}
                title="Categorias" 
                initial_value={filters["category"]}
                onChange={(payload: any)=>setFilters((prev:any)=>({...prev, "category": payload })) }  
                items={departaments_struct.categories}></SelectorNav>

             <SelectorNav 
                filter={[(j:any, i: number): boolean=> ( categories_available.length == 0 || categories_available.includes(j.parent_id) ), categories_available.length] }
                title="Sub Categorias" 
                initial_value={filters["subCategory"]}
                onChange={(payload: any)=>setFilters((prev:any)=>({...prev, "subCategory": payload })) }  
                items={departaments_struct.subCategories}></SelectorNav> 

            <SelectorNav  
                title="Marcas"  
                filter={[(item:any) => brands_available.includes(item.value)]}
                initial_value={filters["brand"]}
                onChange={(payload: any)=>setFilters((prev:any)=>({...prev, "brand": payload })) }  
                items={departaments_struct.brands}></SelectorNav>   
        </Asidefilters>
    )
}
export default CategoriasNav
