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
        trigger: any
    }
}

function sameContent(arr1: any[], arr2:any[]) {
    const set1 = [ ...arr1.map(v=>v.value)];
    const set2 = [ ...arr2.map(v=>v.value)]
    let difference = set1.filter(x => !set2.includes(x));
    var isSame = ( difference?.length != 0 ? false : true)
    return isSame
}

export const CategoriasNav: React.FunctionComponent<CategoriasNav.Params> = ({ trigger, values, departament_id, onChange }) => {
    const dispatch = useDispatch()
    const [ forceFiltersToOpen, setForceFiltersToOpen ] = useState(false)
    const { departaments, loadtry, products } = useSelector( (state: any)=>state.mart);
    useEffect(()=>{ if(loadtry == 0 ) departamentosService.list().then(data => { dispatch(setDepartaments(data))}); },[])
    
    useEffect(()=> trigger.setCallBack( () => setForceFiltersToOpen(prev=>!prev) ), [])

    const { categories_available, subCategories_available, brands_available } = products.data 
    var prevCategoriesAvailable= useRef(categories_available) 
    var prevsubCategoryAvailable = useRef(subCategories_available)
    var prevbrandsAvailable = useRef(brands_available)

    useEffect(()=>{
        if(!sameContent(prevCategoriesAvailable.current, categories_available)){
            onChange(values['category'].filter((s:string)=>categories_available.map((v:any)=>v.value).includes(s)), "category")
        }
        prevCategoriesAvailable.current = categories_available
    },[categories_available])

    useEffect(()=>{
        if(!sameContent(prevsubCategoryAvailable.current, subCategories_available)){
            onChange(values['subCategory'].filter((s:string)=>subCategories_available.map((v:any)=>v.value).includes(s)), "subCategory")
        }
        prevsubCategoryAvailable.current = subCategories_available
    },[subCategories_available])  

    useEffect(()=>{
        if(!sameContent(prevbrandsAvailable.current, brands_available)){
            onChange(values['brand'].filter((s:string)=>brands_available.map((v:any)=>v.value).includes(s)), "brand")
        }
        prevbrandsAvailable.current = brands_available
    },[brands_available])

    return (
        <Asidefilters toggle={forceFiltersToOpen}>
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