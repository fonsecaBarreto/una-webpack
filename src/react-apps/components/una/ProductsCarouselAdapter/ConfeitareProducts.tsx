import * as React from 'react';
import './style.css'
import Item from "./item"
import { produtosServiceV2 } from "@/services/api/v2/produtos-service"
import UtilsCarousel from '../../utils/Carousel';
import { useHistory } from 'react-router-dom';

export const ConfeitareProductsCarousel: React.FunctionComponent<any> = () =>{
    const [products1, setProducts1] = React.useState<any>([])
    const [products2, setProducts2] = React.useState<any>([])
    const history = useHistory();

    React.useEffect(()=>{
        produtosServiceV2.list({categories: ["sobremesa", "festa"]})
            .then(r=>{setProducts1(r.records)});
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
                records={products1} 
                colums={[6,5,4,3,2]}/>

        </div>
                 
    )
}

export default ConfeitareProductsCarousel