import * as React from 'react';
import './style.css'
import Item from "./item"
import { produtosServiceV2 } from "@/services/api/v2/produtos-service"
import UtilsCarousel from '../../utils/Carousel';
import { useHistory } from 'react-router-dom';


export type JokerProductsCarouselProps = {
    q_params: any,
    colums?: number[],
}

export const JokerProductsCarousel: React.FunctionComponent<JokerProductsCarouselProps> = (props) =>{


    const { q_params, colums =[4,4,3,3,2] } = props
    const [products, setProducts] = React.useState<any>([])
    const history = useHistory();
    React.useEffect(()=>{
        produtosServiceV2.list(q_params)
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
                colums={colums}/>
        </div>
                 
    )
}

export default JokerProductsCarouselProps