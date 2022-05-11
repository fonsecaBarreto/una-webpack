import React, { useEffect, useState } from 'react'
import './style.css'
import {Link} from 'react-router-dom'
const INITIAL_LABEL_VIEW = {
    value: "", label: ""
}
export const ProductBreadCrumbs:React.FunctionComponent<any> = ({breadCrumbs}) => {
    
    var [ departament, setDepartament ] = useState<any>(INITIAL_LABEL_VIEW)
    var [ category, setCategory ] = useState<any>(INITIAL_LABEL_VIEW)
    var [ subCategory, setSubCategory ] = useState<any>(INITIAL_LABEL_VIEW)

    useEffect(()=>{
        if(!breadCrumbs) return;
        const base_url = "/mercado"
        setDepartament({
            value: `${base_url}/${breadCrumbs.departament.value}`,
            label: breadCrumbs.departament.label
        })
        setCategory({
            value: `${base_url}?category=${breadCrumbs.category.value}`,
            label: breadCrumbs.category.label
        })
        setSubCategory({
            value: `${base_url}?subCategory=${breadCrumbs.subCategory.value}`,
            label: breadCrumbs.subCategory.label
        })
    },[breadCrumbs])

    return (
        <section> 
            <ul className='product-page-bread-crumbs'>
                <li> <Link to={`/mercado`}>Início</Link> </li> 
                &#8250;
                <li> <Link to={`${departament.value}`}>{departament.label}</Link> </li> 
                &#8250;
                <li> <Link to={`${category.value}`}>{category.label}</Link> </li> 
                &#8250;
                <li> <Link to={`${subCategory.value}`}>{subCategory.label}</Link> </li> 
            </ul>   
         </section>
    )
}

export default ProductBreadCrumbs