import React, { useState, useEffect } from 'react'
import './style.css'
import SelectorNav, { NavComponent } from '../../../components/SelectorNav'
import { useWindowSize } from 'fck-components/lib/utils/hooks'
import BlueLagumAsideModal from '@/react-apps/layouts/BlueLagum/AsideModal'

export interface CategoriasView extends NavComponent.Item {
    departamento_id: string
}

export interface SubCategoriasView extends NavComponent.Item {
    categoria_id: string
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

export namespace CategoriasNav {
    export type Params = {
        onChange: Function, 
        inital_struct: any,
        marcas_availables: string[]
    }
}

const SelectorNavs = ({ toggleFilters, structData, filterData}: any) =>{
    return (<React.Fragment>

        <SelectorNav 
            open_initial={true}
            title="Departamentos" 
            push={(item: any) =>toggleFilters("departamentos", item)}  
            items={structData.departamentos} 
            selectedItems={[...filterData.departamentos.map((f:any)=>f.value)]}></SelectorNav>

        <SelectorNav 
            open_initial={true}
            title="Categorias"  
            push={(item: any) =>toggleFilters("categorias", item)}
            items={structData.categorias} 
            selectedItems={[...filterData.categorias.map((f:any)=>f.value)]}></SelectorNav>

        <SelectorNav 
            open_initial={true}
            title="Sub Categorias" 
            push={(item: any) =>toggleFilters("subCategorias", item)}  
            items={structData.subCategorias} 
            selectedItems={[...filterData.subCategorias.map((f:any)=>f.value)]}></SelectorNav>
            
        <SelectorNav 
            open_initial={true}
            title="Marcas" 
            push={(item: any) => toggleFilters("marcas", item) }  
            items={structData.marcas} 
            selectedItems={[...filterData.marcas.map((f:any)=>f.value)]}></SelectorNav> 
            
    </React.Fragment>)
}
export const CategoriasNav: React.FunctionComponent<CategoriasNav.Params> = ({ onChange, inital_struct, marcas_availables }) => {
    if(!inital_struct) return <span> "Carregando..." </span>;

    const { width } = useWindowSize()
    const [ structData, setStructData ] = useState<DepartamentoData>({ ...INITIAL_DATA })
    const [ filterData, setFilterData ] = useState<DepartamentoData>({ ...INITIAL_DATA }) 
    const [ showFilters, setShowFilters ] = useState(false)


    useEffect(()=>{
        console.log("Instanciado")
    },[])
    useEffect(()=>{ setStructData({ ...inital_struct  }); }, [inital_struct])
  
    useEffect( ()=> { onChange(filterData)  },[filterData])

    useEffect(()=>{  filterMarcas() }, [marcas_availables])

    const filterMarcas = () =>{
        var struct: any =  { ...structData } 
        if (marcas_availables && marcas_availables.length > 0) 
            struct.marcas = inital_struct.marcas .filter((mm: any)=> marcas_availables.includes(mm.value)); 

        setStructData(struct);
    }

    const toggleFilters = ( param: string, item?: any,  ) =>{
        /* 
            Mostra somente as categorias dos respectivos departamentos selecionados 
            - Mostras as subCategorias das respectivas subCategorias
            - Se nao houver categorias selecionas, ou seja todas estão selecionadas ele deve mostrar todas realcionadas a struct a cima
            - Do contrario deve mostrar as subCategorias realcionadas ao filtro selcionado
        */

        const buildStruct = (filterData: any) =>{
            var struct: any =  { ...inital_struct } 

            struct.categorias = filterData["departamentos"].length == 0 ? struct['categorias'] :
                struct['categorias'].filter( (c:any) => ( filterData["departamentos"].map( (d: any)=>d.value ).includes(c['parent_id'])))

            struct.subCategorias =  filterData["categorias"].length == 0 ?  
                struct['subCategorias'].filter( (c:any) => ( struct.categorias.map( (d: any)=>d.value ).includes(c['parent_id']))) :
                struct['subCategorias'].filter( (c:any) => ( filterData["categorias"].map( (d: any)=>d.value ).includes(c['parent_id'])))

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
            if (!item) { filterData[param] = []  } // Se for um item vazio, deve limpar o array
            else {  // Do contrario vai fazer realizar um splice
                let sliced = filterData[param].length > 0 && filterData[param].filter((c:any)=> c.value !== item.value); 
                filterData[param] = sliced.length < filterData[param].length ? sliced : [ ...filterData[param], item ] 
            } 
            if(param != "marcas") buildStruct(filterData) // Se for do parametro marca deve remotar a arvore 
            return filterData
        })
    }

    return (
        <aside className='nav-categorias-aside'>
            { 
            width > 960 ? 
                <SelectorNavs  toggleFilters={toggleFilters} structData={structData} filterData={filterData} ></SelectorNavs>
            :
                <button onClick={()=>setShowFilters(true)}>Filtros</button> 
            }

            <BlueLagumAsideModal className='mobile-only'
                content={ <SelectorNavs  toggleFilters={toggleFilters} structData={structData} filterData={filterData} ></SelectorNavs>}
                footer={<span></span> }
                title='Filtros'
                onClose={()=>setShowFilters(false)}
                show={showFilters}
                dir='left' >
            </BlueLagumAsideModal> 
        </aside> 
    )
}
export default CategoriasNav