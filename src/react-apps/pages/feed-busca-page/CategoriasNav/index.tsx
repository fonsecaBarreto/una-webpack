import React, { useState, useEffect, useRef } from 'react'
import './style.css'
import MultipleSelectionControl from '../../../components/SelectorNav/MultipleSelectionControl'
import Asidefilters from '@/react-apps/layouts/components/AsideFilters'
import { setDepartaments } from '@/react-apps/store/reducers/mart'
import { useSelector, useDispatch } from 'react-redux'
import { departamentosService } from '@/services/api/departamentos-service'

export namespace CategoriasNav {
    export type Params = {
        values: any,
        onChange: any,
        departament_id: string
    }
}

export const CategoriasNav: React.FunctionComponent<CategoriasNav.Params> = ({ values, departament_id, onChange }) => {
    const dispatch = useDispatch()
    const { departaments, loadtry, products } = useSelector( (state: any)=>state.mart);
    useEffect(()=>{ if(loadtry == 0 ) departamentosService.list().then(data => { dispatch(setDepartaments(data))}); },[])
    const { categories_available, subCategories_available, brands_available } = products.data 
    var prevsubCategoryLength = useRef(subCategories_available.length ?? 0)
    var prevbrandsAvailableLength = useRef(brands_available.length ?? 0)
    var categoriesAvailableLength = useRef(categories_available.length ?? 0)

    useEffect(()=>{
        if(prevsubCategoryLength.current != subCategories_available.length){
            onChange(values['subCategory'].filter((s:string)=>subCategories_available.map((v:any)=>v.value).includes(s)), "subCategory")
        }
        prevsubCategoryLength.current = subCategories_available.length
    },[subCategories_available])


    useEffect(()=>{
        if(prevbrandsAvailableLength.current != brands_available.length){
            onChange(values['brand'].filter((s:string)=>brands_available.map((v:any)=>v.value).includes(s)), "brand")
        }
        prevbrandsAvailableLength.current = brands_available.length
    },[brands_available])


    useEffect(()=>{
        if(categoriesAvailableLength.current != categories_available.length){
            onChange(values['category'].filter((s:string)=>categories_available.map((v:any)=>v.value).includes(s)), "category")
        }
        categoriesAvailableLength.current = categories_available.length
    },[categories_available])

    return (
        <Asidefilters>
             {
                (loadtry == 0 || !values) ? (
                    <span> Loading... </span> 
                ):(
                    <React.Fragment>
                        <MultipleSelectionControl 
                            title="Departamentos" items={departaments.departaments} max={1} 
                            value={ departament_id == ""? [] : [{ value: departament_id }]}
                            onChange={(payload: any)=>onChange(payload[0], "departament_id")} >
                        </MultipleSelectionControl>  

                        <MultipleSelectionControl 
                            title="Categorias" items={categories_available}
                            value={values["category"].map((v:string)=>({value: v}))}
                            onChange={ (payload: any)=> onChange(payload.map((v:any)=>v.value), "category")} >
                        </MultipleSelectionControl>

                        <MultipleSelectionControl 
                            title="Sub Categorias" items={subCategories_available}
                            value={values["subCategory"].map((v:string)=>({value: v}))}
                            onChange={(payload: any)=>{ onChange(payload.map((b:any)=>b.value), "subCategory")}} >
                        </MultipleSelectionControl>  

                        <MultipleSelectionControl 
                            title="Marcas" items={brands_available}
                            value={values["brand"].map((v:string)=>({value: v}))}
                            onChange={(payload: any)=>{ onChange(payload.map((b:any)=>b.value), "brand")}} >
                        </MultipleSelectionControl> 

                    </React.Fragment>
                )
            }

        </Asidefilters>
    )
}
export default CategoriasNav