import * as React from 'react';
import './style.css'

import Item from "./item"
import { produtosServiceV2 } from "@/services/api/v2/produtos-service"
import UtilsCarousel from '../../utils/Carousel';

export const PadariaProductsCarousel: React.FunctionComponent<any> = () =>{
    const [products, setProducts] = React.useState<any>([])

    React.useEffect(()=>{
        produtosServiceV2.list({categories: ["misturas", "farinha-de-trigo"]})
            .then(r=>{setProducts(r.records)});
    },[])
    return (
        <div className='common-products-carousel'>
            <UtilsCarousel 
                element={Item} 
                records={products} 
                colums={[4,4,4,3,2]}/>
        </div>
                 
    )
}

export default PadariaProductsCarousel