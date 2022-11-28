import * as React from 'react';
import './style.css'

import Item from "./item"
import { produtosServiceV2 } from "@/services/api/v2/produtos-service"
import UtilsCarousel from '../../utils/Carousel';
import { useHistory } from 'react-router-dom';

export const PadariaProductsCarousel: React.FunctionComponent<any> = () =>{
    const [products1, setProducts1] = React.useState<any>([])
    const [products2, setProducts2] = React.useState<any>([])
    const history = useHistory();
    React.useEffect(()=>{
      /*   produtosServiceV2.list({categories: ["farinha-de-trigo"]})
            .then(r=>{setProducts1(r.records)}); */
        produtosServiceV2.list({categories: ["misturas"]})
            .then(r=>{setProducts2(r.records)});
    },[])


    const handleChanges = (k: string, p?: any) =>{
        switch(k){
            case "OPEN":
                history.push(`/produto/${p}`)
            break;
        }
    }

    return (
        <div className='common-products-carousel'>
       {/*      <UtilsCarousel 
                onChange={handleChanges}
                element={Item} 
                records={products1} 
                colums={[4,4,4,3,2]}/>
 */}
            <UtilsCarousel 
                onChange={handleChanges}
                element={Item} 
                records={products2} 
                colums={[6,5,4,3,2]}/>
        </div>
                 
    )
}

export default PadariaProductsCarousel