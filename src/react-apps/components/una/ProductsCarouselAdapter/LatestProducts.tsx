import * as React from 'react';
import './style.css'

import Item from "./item"
import { useSelector } from 'react-redux';
import { produtosServiceV2 } from "@/services/api/v2/produtos-service"
import UtilsCarousel from '../../utils/Carousel';
import { useHistory } from 'react-router-dom';

export const LatestProductsCarousel: React.FunctionComponent<any> = () =>{
    const history = useHistory();
    const [products, setProducts] = React.useState<any>([0,1,2,3,4,5])
  
    React.useEffect(()=>{
        produtosServiceV2.findLatest()
            .then(r=>{setProducts(r.records)});
    },[])

    const handleChanges = (k: string, p?: any) =>{
        switch(k){
            case "OPEN":
                history.push(`/produto/${p}`)
            break;
        }

    }

    return (
     
        <div className='latest-products-carousel'>
            <UtilsCarousel 
                onChange={handleChanges}
                element={Item} 
                records={products}/>
        </div>
              
       
    )
}

export default LatestProductsCarousel