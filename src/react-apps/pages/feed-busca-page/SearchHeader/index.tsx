import React from 'react'
import { MdPlayArrow } from 'react-icons/md'
import './style.css'

export const LabelResult = ({ label, value}:any) =>{
    return (

        <div className='search-header-label-result'>
            <span> {label} </span>
        </div>
    )
}

export const LabelRow = ({label, list}:{label: string, list: any[]}) =>{

    return (
        <div className='search-header-label-row'>
            <label>{label}</label>
            <MdPlayArrow/>
            {
                list.length == 0 ?  <LabelResult value={""} label={"*"}></LabelResult> :
                list.map((c,i)=>{
                    let label = list[i].label 
                    return (<LabelResult value={""} label={label}></LabelResult>)
                })
            }
        </div>
    )
}

export const SearchHeader: React.FunctionComponent<any>= ({queries}) =>{
    return (
        <span className='flex-column'> 
            <label> Buscou por: <span> "{queries.specification}"</span> </label>  
            <LabelRow label={"Departamento"} list={ queries?.departament ?? []}></LabelRow>
            <LabelRow label={"Categoria"} list={ queries?.category ?? []}></LabelRow>
            <LabelRow label={"Sub Categoria"} list={ queries?.subCategory ?? []}></LabelRow>
            <LabelRow label={"Marcas"} list={ queries?.brand ?? []}></LabelRow>
        </span>
    )
}
export default SearchHeader