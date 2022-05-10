import { LabelView } from '@/domain/views/ListingView';
import UseSearchAdapter from '@/react-apps/components/SearchAdapter';
import { setDepartaments, setProducts } from '@/react-apps/store/reducers/mart';
import { departamentosService } from '@/services/api/departamentos-service';
import { produtosService } from '@/services/api/produtos-service';

import * as React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

export const SEARCH_HEADER= { 
    params : [ "departament_id" ],
    search : [ "category", "subCategory", "brand", "v", "p", "filters" ]
};
export namespace UseFetchManager {
    export type Departaments = Record< "departaments" | "brands" | "categories" | "presentations"  | "subCategories" , LabelView[]>
}
export const INITIAL_DEPARTAMENTS = {
    departaments: [],  brands: [], categories:[], presentations:[], subCategories:[]
}


export const UseFetchManager = () =>{
    const dispatch = useDispatch()
    const [ isLoading, setIsLoading ] = React.useState(true);
    const [ availables , setAvailabes ] = React.useState<UseFetchManager.Departaments>({ ...INITIAL_DEPARTAMENTS })
    const [ values, setValues ] = React.useState<any>({})
    const { parsedParams, parsedSearch, appendToHistory, pushToHistory } = UseSearchAdapter({ header: SEARCH_HEADER })

    /* Primeiro fetch para buscar os departamentos */
    React.useEffect(() => {
        setIsLoading(true)
        departamentosService.list()
            .then((data:any) => {
                setAvailabes((prev: any)=>({ ...prev, ...data }))
                dispatch(setDepartaments(data) )
            })
            .finally(()=>setIsLoading(false))
    },[])

    /* Deve receber valores de Filtros via url */
    React.useEffect(()=>{
        if(!parsedParams || !parsedSearch) return;
        setValues((prev: any) =>  ( { ...prev,  departament: parsedParams.departament_id, ...parsedSearch }))
    },[parsedParams, parsedSearch])
    
    /* Realiza pesquisa quando filtros forem atualizados */
    React.useEffect( ()=>{ if( Object.keys(values).length > 0 ) handleSearch(); },[values])

    const handleChange = (arg: object, clear: boolean) => { pushToHistory(arg, clear) }

    const handleSearch = async () => {

        setIsLoading(true)

        var subCategories_availables = availables['subCategories'].map((v:any)=>v.value);
        var brands_available = availables['brands'].map((v:any)=>v.value);
    
        const submitValues = {
            v: values.v[0],  p: values.p[0],
            departament_id: values?.departament ?? "",
            category: values?.category ?? [],
            subCategory: (subCategories_availables.length > 0) ? 
                values?.subCategory.filter((s:string)=>subCategories_availables.includes(s)) : values.subCategory ,
            brand: (brands_available.length > 0 ) ?
                values?.brand.filter((s:string)=>brands_available.includes(s)) : values.brand
        }

        /* Valores dos filtros devem ser filtrados somente antes de enviar para o sevidor */
        produtosService.list(submitValues)
            .then( (r)=> {
                // reitificar valores disponiveis aqui
                const { categories_available, subCategories_available, brands_available  } = r.data
                setAvailabes((prev: any)=>{
                    return {
                        ...prev, 
                        categories: categories_available,
                        subCategories: subCategories_available,
                        brands: brands_available 
                    }
                })
                /* disparar novos valores para produtos */
                dispatch(setProducts(r))
            })
            .finally(()=>{ setIsLoading(false) })
    } 

    return ({ isLoading, availables, values, onChange: handleChange })
}


export default UseFetchManager
