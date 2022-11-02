import * as React from 'react';
import './style.css'

import Item from "./item"
import { useSelector } from 'react-redux';
import { produtosServiceV2 } from "@/services/api/v2/produtos-service"
import UtilsCarousel from '../../utils/Carousel';

export const LatestProductsCarousel: React.FunctionComponent<any> = () =>{
    const [products, setProducts] = React.useState<any>([0,1,2,3,4,5])
    const { user }:any = useSelector<any>((state: any)=>state.main);

    React.useEffect(()=>{
        if(!user) return;
        produtosServiceV2.findLatest()
            .then(r=>{setProducts(r.records)});
    },[user])
    return (
        <>
            { (user && products.length) ?
                <div className='latest-products-carousel'>
                    <UtilsCarousel element={Item} records={products} viewport_height={"280px"}/>
                </div>
                : <></>
            }
        </>
    )
}

export default LatestProductsCarousel