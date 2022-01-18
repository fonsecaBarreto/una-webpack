import React, { useState, useEffect } from 'react'
import './style.css'
import SelectorNav, { NavComponent } from './SelectorNav'
import { departamentosService } from "@/services/departamentos-service"
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
    subCategorias: [],
    marcas: [],
}

export const NavCategorias: React.FunctionComponent<any> = ({onChange}) => {

    const { struct, marcasAvailables } = useSelector((state :any) => state.departamentos)
    const [ initialData, setInitalData ] = useState<any>({ ...INITIAL_DATA })
    const [ structData, setStructData ] = useState<DepartamentoData>({ ...INITIAL_DATA })
    const [ filterData, setFilterData ] = useState<DepartamentoData>({ ...INITIAL_DATA }) 

    /* Baixa de foram asincona a estrutura de departamentos */
    useEffect(()=>{ departamentosService.list() },[])
    
    useEffect(()=>{
        if(struct) {
            const data = MakeStructLabelData(struct);
            setInitalData(data);
            return setStructData(data);
        }
    },[ struct ])

    useEffect( ()=> { onChange(filterData)  },[filterData])

    useEffect(()=>{ filterAvailablesMarcas() },[marcasAvailables])

    const MakeStructLabelData = (struct: any) =>{
        return ({  
            departamentos: struct?.departamentos ? struct.departamentos.map( (d: any) =>( { value: d.id, label: d.nome } )) : [],
            categorias: struct?.categorias ? struct.categorias.map( (c:any) =>({ value: c.id, label: c.nome, departamento_id: c.departamento_id })) : [],
            subCategorias: struct?.subCategorias ? struct.subCategorias.map( (c:any) =>({ value: c.id, label: c.nome, categoria_id: c.categoria_id })) : [],
            marcas: struct?.marcas ? struct.marcas.map( (c:any) =>({ ...c })) :[]
        })
    } 

    const toggleFilters = ( param: string, item?: any,  ) =>{
        const buildStruct = (filterData: any) =>{
            /* Mostra somente as categorias dos respectivos departamentos selecionados 
                - Mostras as subCategorias das respectivas subCategorias
                - Se nao houver categorias selecionas, ou seja todas estão selecionadas ele deve mostrar todas realcionadas a struct a cima
                - Do contrario deve mostrar as subCategorias realcionadas ao filtro selcionado
            */
            var struct =  { ...initialData } 

            struct.categorias = filterData["departamentos"].length == 0 ?  struct['categorias'] :
                struct['categorias'].filter( (c:any) => ( filterData["departamentos"].map( (d: any)=>d.value ).includes(c['departamento_id'])))

            struct.subCategorias =  filterData["categorias"].length == 0 ?  
                struct['subCategorias'].filter( (c:any) => ( struct.categorias.map( (d: any)=>d.value ).includes(c['categoria_id']))) :
                struct['subCategorias'].filter( (c:any) => ( filterData["categorias"].map( (d: any)=>d.value ).includes(c['categoria_id'])))

            /* Toda vez que um departamento é selecionado, deve ser limpar os filtros realcionado as categorias */
            filterData['categorias'] = filterData["categorias"].filter((c: any)=>{
                return ( struct["categorias"].map((s: any)=>s.value).includes(c.value) ) 
            })

            filterData['subCategorias'] = filterData["subCategorias"].filter((c: any)=>{
                return ( struct["subCategorias"].map((s: any)=>s.value).includes(c.value) ) 
            })

            setStructData(struct)
        }

        return setFilterData( ( prev: any ) => {
            var filterData: any = { ...prev }
            if(!item) { filterData[param] = []  }
            else {  
                let sliced = filterData[param].length > 0 && filterData[param].filter((c:any)=> c.value !== item.value); 
                filterData[param] = sliced.length < filterData[param].length ? sliced : [ ...filterData[param], item ] 
            } 
            buildStruct(filterData)
            return filterData
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
                
            <SelectorNav 
                title="Marcas" push={(item: any) =>toggleFilters("marcas", item)}  items={structData.marcas} 
                selectedItems={[...filterData.marcas.map((f:any)=>f.value)]}></SelectorNav> 
        </aside> 
    )
}

export default NavCategorias

