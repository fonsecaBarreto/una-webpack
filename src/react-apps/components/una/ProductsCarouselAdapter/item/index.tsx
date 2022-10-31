import * as React from 'react';
import "./style.css"
import ProductImage from "@/public/assets/images/product/empty.svg"
import { filesService } from '@/services/api/files-service';
import { useHistory } from 'react-router-dom';
import { UtilsCarouselTypes } from '@/react-apps/components/utils/Carousel';

/* export const ProductImageSection: React.FunctionComponent<any> = ({ onClick }) =>{
    
    const [ image, setImage ] = React.useState(ProductImage);
    return (
        <section className='latest-product-item-img-vp' onClick={onClick}> 
            <img alt="Ilustração do produto" src={image}></img>
        </section>
    )
} */

export const ProductCarouselItem: React.FunctionComponent<UtilsCarouselTypes.ItemProps<any>> = (props) =>{
    const  { entry: { data, index }, onChange, } = props;
    //ean, specification, brand, weight, volume, quantity_per_unity 
/*     const history = useHistory()
    const handleClick = (k: any) =>{
        return history.push(`/produto/${ean}`);
    }
 */
    return (
        <div className={`latest-product-item`} /* onClick={handleClick} */ >
              <section>
                    {index}
                  {/* <ProductImageSection> </ProductImageSection> */}
              </section>
              <section className='lpi-body' /* onClick={()=>{ handleClick("MOVE")}} */>

                    {/* <span className="lpi-produto-nome"> {specification} </span>
                    <span className="lpi-produto-ean"> {ean}</span> */}
              </section>  
      </div>
    )
}

export default ProductCarouselItem