import * as React from 'react';
import './style.css'

import Item from "./item"
import { useSelector } from 'react-redux';
import { produtosServiceV2 } from "@/services/api/v2/produtos-service"
import UtilsCarousel from '../../utils/Carousel';
import { useHistory } from 'react-router-dom';

export const OfertasProductsCarousel: React.FunctionComponent<any> = () =>{
    const history = useHistory();
    const [products, setProducts] = React.useState<any>([0,1,2,3,4,5])
    const { user }:any = useSelector<any>((state: any)=>state.main);

    React.useEffect(()=>{
        if(!user) return;
        produtosServiceV2.findLatest()
            .then(r=>{setProducts(r.records)});
    },[user])


    const handleChanges = (k: string, p?: any) =>{
        switch(k){
            case "OPEN":
                history.push(`/produto/${p}`)
            break;
        }

    }
    return (
    
        <div className='common-products-carousel'>
            <UtilsCarousel 
                onChange={handleChanges}
                element={Item} 
                records={products} 
                colums={[5,5,4,3,2]}/>
        </div>
               
          
  
    )
}

export default OfertasProductsCarousel