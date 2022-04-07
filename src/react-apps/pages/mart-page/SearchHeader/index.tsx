import React, { ReactNode } from 'react'
import { MdPlayArrow } from 'react-icons/md'
import './style.css'
import { Link } from 'react-router-dom'
import { RiArrowDropRightLine, RiPriceTag2Fill, RiPriceTag2Line } from 'react-icons/ri'
import { FaSearch } from 'react-icons/fa'
import { AiFillTags } from 'react-icons/ai'

export const LabelResult = ({ label, value}:any) =>{
    return (
        <span className='search-header-label-result'>
            <span> {label} </span>
        </span>
    )
}

export const LabelRow = ({label, list, icon, emptyAlias="*"}:{icon?:ReactNode, emptyAlias?: string, label?: any, list: any[]}) =>{

    return (
        <div className='search-header-label-row'>
            {label && <label>  { icon && icon }  {label} </label>}
            {
                list.length == 0 ?  <LabelResult value={""} label={emptyAlias}></LabelResult> :
                list.map((c,i)=>{
                    let label = list[i].label 
                    return (<LabelResult value={""} label={label+=(i!=0 || i < list.length-1) ? ", ": ""} key={i}></LabelResult>)
                })
            }
            
        </div>
    )
}

export const SearchHeader: React.FunctionComponent<any>= ({queries}) =>{
    return (
        <div className='products-search-header'>
            <span className='products-search-header-row' > 
                <LabelRow icon={<FaSearch/>}
                label={"Pesquisa: "} list={  queries?.specification ?[ {label: queries?.specification }] : []}  emptyAlias="..."></LabelRow>
            </span>

         {/*    <span className='products-search-header-row'> 
                <LabelRow icon={<RiPriceTag2Fill/>} label={"Departamentos: "} list={ queries?.departament ?? []}  emptyAlias="Todos"></LabelRow>
                <span className="products-search-arrow-divider"> <RiArrowDropRightLine/> </span>
                <LabelRow list={ queries?.category ?? []} emptyAlias="Todas"></LabelRow>
                <span className="products-search-arrow-divider"> <RiArrowDropRightLine/> </span>
                <LabelRow list={ queries?.subCategory ?? []}  emptyAlias="Todas"></LabelRow>
            </span> */}

            <span className='products-search-header-row'> 
                <LabelRow icon={<RiPriceTag2Line/>} label={"Marcas: "} list={ queries?.brand ?? []} emptyAlias="Todas"></LabelRow>
            </span> 
        </div>
    )
}
export default SearchHeader