/* Esse é o conjunto de NavComponents */
import React, { useState, useEffect } from 'react'
import './style.css'
import SelectorNav, { NavComponent } from './SelectorNav'
import { departamentosService } from "@/react-apps/services/departamentos-service"
import { useSelector } from 'react-redux'

 export interface CategoriasView extends NavComponent.Item {
    departamento_id: string
}
export interface SubCategoriasView extends NavComponent.Item {
    categoria_Id: string
}

export interface DepartamentoData {
    departamentos: NavComponent.Item[]
    categorias: CategoriasView[],
    subCategorias: SubCategoriasView[],
    marcas: NavComponent.Item[]
}

const INITIAL_DATA = {
    departamentos: [],
    categorias: [],
    subCategorias:[],
    marcas:[],
}

export const NavCategorias: React.FunctionComponent<any> = () => {

    const { struct } = useSelector((state :any) => state.departamentos)
    const [ initialData, setInitalData ] = useState<any>({ ...INITIAL_DATA })
    const [ structData, setStructData ] = useState<DepartamentoData>({ ...INITIAL_DATA })
    const [ filterData, setFilterData ] = useState<DepartamentoData>({ ...INITIAL_DATA }) 

    const toggleFilters = ( param: string, item?: any[] | any,  ) =>{
        return setFilterData( ( prev: any ) => {
            if(!item) return { ...prev, [param]: []} 
            if(Array.isArray(item)) return { ...prev, [param]: item }
            let sliced = [ ...prev[param].filter((c:any)=> c.value !== item.value) ];
            var lista_data = sliced.length < prev[param].length ? [ ...sliced ] : [ ...sliced, item ]
            return { ...prev, [param]: lista_data}
        })
    }
    useEffect(()=>{ departamentosService.list() },[])
    
    useEffect(()=>{
        if(struct) {
            const data = MakeStructLabelData(struct);
            setInitalData(data);
            return setStructData(data);
        }
    },[ struct ])

    useEffect(()=>{  doFilters(filterData, "departamentos", "categorias", "departamento_id") },[filterData.departamentos])
    useEffect(()=>{  doFilters(filterData, "categorias", "subCategorias", "categoria_id") },[filterData.categorias])

    const doFilters = (filterData:any, from: string, to: string, key: string ) => {
        var struct = ( filterData[from].length == 0) ? initialData[to] : 
        initialData[to].filter( (c:any) => ( filterData[from].map( (d: any)=>d.value ).includes(c[key])))
        setStructData(prev => ({ ...prev, [to]: struct }))
        var rmains: any = filterData[to].filter( (f: any) => 
            (struct.map((s: any)=>s.value).includes(f.value)))  
        setFilterData(prev => ({ ...prev, [to]: rmains}))
    } 
    const MakeStructLabelData = (struct: any) =>{
        return ({  
            departamentos: struct?.departamentos ? struct.departamentos.map( (d: any) =>( { value: d.id, label: d.nome } )) : [],
            categorias: struct?.categorias ? struct.categorias.map( (c:any) =>({ value: c.id, label: c.nome, departamento_id: c.departamento_id })) : [],
            subCategorias: struct?.subCategorias ? struct.subCategorias.map( (c:any) =>({ value: c.id, label: c.nome, categoria_id: c.categoria_id })) : [],
            marcas: struct?.marcas ? struct.marcas.map( (c:any) =>({ ...c })) :[]
        })
    } 
    return (
        <aside className='nav-categorias-aside'>
            <SelectorNav 
                title="Departamentos" push={(item: any) =>toggleFilters("departamentos", item)}  items={structData.departamentos} 
                selectedItems={[...filterData.departamentos.map((f:any)=>f.value)]}></SelectorNav>

            <SelectorNav 
                title="Categorias"  push={(item: any) =>toggleFilters("categorias", item)}  items={structData.categorias} 
                selectedItems={[...filterData.categorias.map((f:any)=>f.value)]}></SelectorNav>

            <SelectorNav 
                title="Sub Categorias"  push={(item: any) =>toggleFilters("subCategorias", item)}  items={structData.subCategorias} 
                selectedItems={[...filterData.subCategorias.map((f:any)=>f.value)]}></SelectorNav>
        </aside> 
    )
}

export default NavCategorias

