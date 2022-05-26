import * as React from 'react';
import './style.css'
import ProductsCarousel from 'fck-products-carousel';
import Item from "./item"
import { useSelector } from 'react-redux';
import { produtosService } from "@/services/api/produtos-service"
import { json } from 'stream/consumers';

const HEIGHT = 280
export const ProductsCarouselAdapter: React.FunctionComponent<any> = () =>{
    const [products, setProducts] = React.useState([])
    const { user }:any = useSelector<any>((state: any)=>state.main);
    React.useEffect(()=>{
        produtosService.findLatest()
            .then(r=>{setProducts(r.records)});
    },[user])
    return (
        <div className='latest-products-carousel'>
            <h5> Ultimos Acessos: </h5>
           { (user && products.length) &&
                <ProductsCarousel records={products} viewport_height={HEIGHT}>
                    <Item></Item>
                </ProductsCarousel>
            }
        </div>
    )
}

export default ProductsCarouselAdapter