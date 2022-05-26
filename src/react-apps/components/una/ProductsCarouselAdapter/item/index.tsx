import * as React from 'react';
import "./style.css"
import ProductImage from "@/public/assets/images/product/empty.svg"
import { filesService } from '@/services/api/files-service';
import { useHistory } from 'react-router-dom';

export const ProductImageSection: React.FunctionComponent<any> = ({ onClick }) =>{
    
    const [ image, setImage ] = React.useState(ProductImage);
    return (
        <section className='latest-product-item-img-vp' onClick={onClick}> 
            <img alt="Ilustração do produto" src={image}></img>
        </section>
    )
}

export const ProductCarouselItem: React.FunctionComponent<any> = ({ ean, specification, brand, presentation }) =>{

    const history = useHistory()
    const handleClick = (k: any) =>{
        return history.push(`/produto/${ean}`);
    }

    return (
        <div className={`latest-product-item`} onClick={handleClick} >
              <section>
                  <ProductImageSection> </ProductImageSection>
              </section>
              <section className='lpi-body' onClick={()=>{ handleClick("MOVE")}}>
                  <span className="lpi-produto-nome"> {specification} </span>
                  <span className="lpi-produto-presentation"> {presentation.quantity}
                      {presentation}
                   </span>  
                    <span className="lpi-produto-ean"> {ean}</span>
              </section>  
      </div>
    )
}

export default ProductCarouselItem