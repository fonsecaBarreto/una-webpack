import * as React from 'react';
import "./style.css"
import ProductImage from "@/public/assets/images/product/empty.svg"
import { filesService } from '@/services/api/files-service';
import { useHistory } from 'react-router-dom';
import { UtilsCarouselTypes } from '@/react-apps/components/utils/Carousel';

/* export const ProductImageSection: React.FunctionComponent<any> = ({ onClick }) =>{
    
    const [ image, setImage ] = React.useState(ProductImage);
    return (
        
    )
} */

export const ProductCarouselItem: React.FunctionComponent<UtilsCarouselTypes.ItemProps<any>> = (props) =>{
    const  { entry: { data, index }, onChange, } = props;
    const { ean, specification, supplies_prices, image  } = data

    return (
        <div className={`carousel-product-item`} /* onClick={handleClick} */ >
              <header>
                <section className='carousel-product-item-img-vp'> 
                    <img alt="Ilustração do produto" src={image ?? ProductImage}></img>
                </section>
              </header>
              <main  /* onClick={()=>{ handleClick("MOVE")}} */>
                    <span className="lpi-produto-nome"> {specification} </span>
                   
                        <div className='lpi-produto-prices'>
                            Preço aqui
                            {/* <span className={`${prices[0] ==0 ? 'priceless' : ""}`}>
                                {    prices[0] == 0 ?
                                    <React.Fragment> Preço sobre orçamento </React.Fragment> :
                                    <React.Fragment>  R$: {prices[0].toFixed(2)} <span className="unidade-preco">und. </span></React.Fragment>
                                }
                            </span>

                            <span>
                                { prices[0] != prices[1] && 
                                    <React.Fragment> 
                                        {`orfertas de ${prices[0].toFixed(2)} até ${prices[1].toFixed(2)}`} 
                                    </React.Fragment>}
                            </span> */}
                        </div> 
                    
              </main>  
      </div>
    )
}

export default ProductCarouselItem