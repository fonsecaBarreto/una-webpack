import React, { useState, useEffect } from 'react'
import './style.css'
import SelectorNav, { SelectionControl } from '../../../components/SelectorNav/SelectionControl'
import Asidefilters from '@/react-apps/layouts/components/AsideFilters'
import { DepartamentosState } from '@/react-apps/store/reducers/departaments'

const INITIAL_DATA = {
    departamentos: [],
    categorias: [],
    subCategorias: [],
    marcas: [],
}

export namespace CategoriasNav {
    export type Params = {
        onChange: Function, 
        inital_struct: any,
        marcas_availables: string[]
    }
}

type CategoriasLike = "departamentos" | "categorias" | "subCategorias"

export const CategoriasNav: React.FunctionComponent<CategoriasNav.Params> = ({ onChange, inital_struct, marcas_availables }) => {
    if(!inital_struct) return <span> "Carregando..." </span>;

    const [ structData, setStructData ] = useState<DepartamentosState.struct>({ ...INITIAL_DATA })
    const [ filterData, setFilterData ] = useState<DepartamentosState.struct>({ ...INITIAL_DATA }) 
    useEffect(()=>{ setStructData({ ...inital_struct  }); }, [inital_struct])

    useEffect(()=>{ onStructChange('categorias', "departamentos") }, [filterData.departamentos])
    useEffect(()=>{ onStructChange('subCategorias',"categorias") }, [filterData.categorias, structData.categorias]) 
    useEffect( ()=> { onChange(filterData) },[filterData])
    useEffect(()=>{  filterMarcas() }, [marcas_availables])
 
    const filterMarcas = () =>{
        var struct: any =  { ...structData } 
        if (marcas_availables && marcas_availables.length > 0) 
            struct.marcas = inital_struct.marcas .filter((mm: any)=> marcas_availables.includes(mm.value)); 
        setStructData(struct);
    }

    const onStructChange = (name:CategoriasLike, parent_name:CategoriasLike ) =>{
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
                onChange={(payload: SelectionControl.Item[])=>handleSelectorChange("departamentos", payload)}  
                items={structData.departamentos}></SelectorNav>
            <SelectorNav 
                title="Categorias" 
                onChange={(payload: SelectionControl.Item[])=>handleSelectorChange("categorias", payload)}  
                items={structData.categorias}></SelectorNav>
            <SelectorNav 
                title="Sub Categorias" 
                onChange={(payload: SelectionControl.Item[])=>handleSelectorChange("subCategorias", payload)}  
                items={structData.subCategorias}></SelectorNav> 
            <SelectorNav  
                title="Marcas"  
                onChange={(payload: SelectionControl.Item[])=>handleSelectorChange("marcas", payload)}  
                items={structData.marcas}></SelectorNav>  
        </Asidefilters>
    )
}
export default CategoriasNav
