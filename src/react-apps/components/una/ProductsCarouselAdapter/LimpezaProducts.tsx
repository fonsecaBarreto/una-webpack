import * as React from 'react';
import './style.css'
import Item from "./item"
import { produtosServiceV2 } from "@/services/api/v2/produtos-service"
import UtilsCarousel from '../../utils/Carousel';
import { useHistory } from 'react-router-dom';

export const LimpezaProductsCarousel: React.FunctionComponent<any> = () =>{
    const [products, setProducts] = React.useState<any>([])
    const history = useHistory();
    React.useEffect(()=>{
        produtosServiceV2.list({categories: ["antibactericidas"]})
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
        <div className='common-products-carousel'>
            <UtilsCarousel 
                onChange={handleChanges}
                element={Item} 
                records={products} 
                colums={[5,4,4,3,2]}/>
        </div>
                 
    )
}

export default LimpezaProductsCarousel