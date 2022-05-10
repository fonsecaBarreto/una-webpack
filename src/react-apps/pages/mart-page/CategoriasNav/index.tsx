import React, { useState, useEffect, useRef } from 'react'
import './style.css'
import MultipleSelectionControl from '../../../components/SelectorNav/MultipleSelectionControl'
import Asidefilters from '@/react-apps/layouts/components/AsideFilters'

export namespace CategoriasNav {
    export type Params = { manager: any }
}

export const CategoriasNav: React.FunctionComponent<CategoriasNav.Params> = ({ manager }) => {
    const { availables, values, onChange } = manager
    return (
        <Asidefilters onChange={(v:any)=>{if(v==-1)return onChange({filters:null}, false)}} allowedToShow={ values?.filters[0] ? true : false} >
            <React.Fragment>
                 <MultipleSelectionControl title="Departamentos" items={availables.departaments} max={1} 
                    value={ !values?.departament ? [] : [{ value: values.departament }]}
                    onChange={(p: any)=> onChange( { departament_id : p.map((b: any)=>b.value) }, true)} >
                </MultipleSelectionControl>  
                <MultipleSelectionControl title="Categorias" items={availables.categories}
                    value={ !values.category ? [] : values["category"].map((v:string)=>({value: v}))}
                    onChange={(p: any)=>  onChange({ category: p.map((b: any)=>b.value )}, false)} >
                </MultipleSelectionControl>
                <MultipleSelectionControl title="Sub Categorias" items={availables.subCategories}
                    value={ !values.subCategory ? [] : values["subCategory"].map((v:string)=>({value: v}))}
                    onChange={(p: any)=>{ onChange({ subCategory: p.map((b: any)=>b.value)}), false}} >
                </MultipleSelectionControl>  
                <MultipleSelectionControl title="Marcas" items={availables.brands}
                    value={values["brand"].map((v:string)=>({value: v}))}
                    onChange={(p: any)=>{ onChange({ brand: p.map((b: any)=>b.value) }, false)}} >
                </MultipleSelectionControl>   
            </React.Fragment>
        </Asidefilters>
    )
}
export default CategoriasNav