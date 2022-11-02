import * as React from 'react';
import ProductImage from "@/public/assets/images/product/empty.svg"
import { UtilsCarouselTypes } from '@/react-apps/components/utils/Carousel';

export const CarouselsCategoriasItem: React.FunctionComponent<UtilsCarouselTypes.ItemProps<any>> = (props) =>{
    const  { entry: { data, index }, onChange, } = props;

    return (
        <div className={`carousel-categories-item`} onClick={()=>onChange && onChange("OPEN", data.key)} >
              <main>
                <section>
                  <img alt="Ilustração da categoria" src={data.image ?? ProductImage}></img> 
                </section>
              </main>
              <footer>
                    <span> {data.label} </span>
              </footer>  
      </div>
    )
}

export default CarouselsCategoriasItem