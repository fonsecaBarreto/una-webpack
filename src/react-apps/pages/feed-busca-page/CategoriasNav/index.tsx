import React, { useState, useEffect } from 'react'
import './style.css'
import SelectorNav, { SelectionControl } from '../../../components/SelectorNav/SelectionControl'
import Asidefilters from '@/react-apps/layouts/components/AsideFilters'
import { DepartamentosState, INITIAL_DEPARTAMENTOS_STRUCT } from '@/react-apps/store/reducers/departaments'

export namespace CategoriasNav {
    export type Params = {
        onChange: Function, 
        inital_struct: any,
        marcas_availables: string[]
    }
}

export const CategoriasNav: React.FunctionComponent<CategoriasNav.Params> = ({ onChange, inital_struct, marcas_availables }) => {
    if(!inital_struct) return <span> "Carregando..." </span>;

    const [ structData, setStructData ] = useState<DepartamentosState.FilterStruct>({ ...INITIAL_DEPARTAMENTOS_STRUCT })
    const [ filterData, setFilterData ] = useState<DepartamentosState.FilterStruct>({ ...INITIAL_DEPARTAMENTOS_STRUCT }) 
    useEffect(()=> { setStructData({ ...inital_struct }); }, [inital_struct])
    useEffect(()=> { onStructChange('categories', "departaments") }, [filterData.departaments])
    useEffect(()=> { onStructChange('subCategories',"categories") }, [filterData.categories, structData.categories]) 
    useEffect(()=> { onChange(filterData) },[filterData])
    useEffect(()=> { filterMarcas(marcas_availables) }, [marcas_availables])
  
    const filterMarcas = (marcas_availables: any[]) =>{
       
        var struct: any =  { ...structData } 
        if (marcas_availables && marcas_availables.length > 0) {
            struct.brands = inital_struct.brands.filter((mm: any)=> marcas_availables.includes(mm.value)); 
        }
        setStructData(struct);
    }

    const onStructChange = (name:DepartamentosState.CategoriasLike, parent_name: DepartamentosState.CategoriasLike ) =>{
        /* se o filtro relacionado a categorias estiver vazio significa que deve ser levado em consideração todas as categorias disponiveis */
        var parent_values = filterData[parent_name].length == 0 ? structData[parent_name] : filterData[parent_name];
        var result = inital_struct[name].filter((c: any)=>parent_values.map((p:any)=>p.value).includes(c.parent_id)); 
        setStructData(prev=>({...prev, [name]: result}))
    }
  
    const handleSelectorChange = (name:string, payload:any) =>{
        return setFilterData(prev=>({ ...prev, [name]: payload}))
    }
   
    return (
        <Asidefilters>
            <SelectorNav 
                title="Departamentos" 
                onChange={(payload: SelectionControl.Item[])=>handleSelectorChange("departaments", payload)}  
                items={structData.departaments}></SelectorNav>
            <SelectorNav 
                title="Categorias" 
                onChange={(payload: SelectionControl.Item[])=>handleSelectorChange("categories", payload)}  
                items={structData.categories}></SelectorNav>
            <SelectorNav 
                title="Sub Categorias" 
                onChange={(payload: SelectionControl.Item[])=>handleSelectorChange("subCategories", payload)}  
                items={structData.subCategories}></SelectorNav> 
            <SelectorNav  
                title="Marcas"  
                onChange={(payload: SelectionControl.Item[])=>handleSelectorChange("brands", payload)}  
                items={structData.brands}></SelectorNav>  
        </Asidefilters>
    )
}
export default CategoriasNav
