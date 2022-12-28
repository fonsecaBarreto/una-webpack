import * as React from 'react';
import "./style.css"
import ProductImage from "@/public/assets/images/product/empty.svg"
import { filesService } from '@/services/api/files-service';
import { useHistory } from 'react-router-dom';
import StarImg from "@assets/icons/star.svg"
import { UtilsCarouselTypes } from '@/react-apps/components/utils/Carousel';
import { Product } from '@/domain/views/Product';
  
const FAKE_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur gravida tincidunt ipsum, vitae rhoncus eros. Aliquam in mauris suscipit, scelerisque odio a, faucibus odio. Ut volutpat tempus sem condimentum viverra. Mauris ullamcorper ipsum id dolor consectetur elementum."

export const ProductCarouselItem: React.FunctionComponent<UtilsCarouselTypes.ItemProps<Product>> = (props) =>{
    const  { entry: { data, index }, onChange, } = props;
    const { ean, specification, supplies, image, quantity_per_unity  } = data
    const [ expirationDate, setExpirationDate ] = React.useState("")
    const [ higherPrice, setHigherPrice ] = React.useState(0);
    const [ lowestPrice, setLowestPrice ] = React.useState(0);

    React.useEffect(()=>{

        if(supplies?.length > 0 ){

            let maior:number =-1, menor: number = -1;

            for(let n = 0 ; n < supplies.length ; n ++ ){
                let {price}  = supplies[n]
                if(maior == -1){
                    maior = price, menor = price;
                }else{
                    maior = price > maior ? price : maior;
                    menor = price < menor ? price : menor;
                }
            }
            setExpirationDate(new Date(supplies[0].expiration).toISOString().split("T")[0])
            setHigherPrice(maior/(quantity_per_unity ?? 1))
            setLowestPrice(menor/(quantity_per_unity ?? 1))
        }
    },[ supplies])


    return (
        <div className={`carousel-product-item`} onClick={()=>onChange && onChange("OPEN", ean)} >
            <header>
                <section className='carousel-product-item-img-vp'> 
                    <img alt="Ilustração do produto" src={image ?? ProductImage}></img>
                </section>
            </header>
            <main>
                <span className='carousel-pi-spec'>{specification}</span>
                <span className='carousel-pi-stars'>
                    {[...Array(5)].map((_,i)=>{
                        return (
                            <img key={i}src={StarImg}/>
                        )
                    })}
                </span>
                
                <section className='carousel-pi-prices-section'>
                    {
                        lowestPrice ?
                        <span className='carousel-pi-price'>
                            <span>
                                R$: {lowestPrice.toFixed(2)}
                                <span className="unidade-preco"> und. </span>
                            </span>
                            <span>  
                                {`Ofertas de ${lowestPrice.toFixed(2)} ${ higherPrice ? `até ${higherPrice.toFixed(2)}`: ""}`} 
                            </span>                            
                        </span>
                        :
                        <span className='carousel-pi-priceless'>
                            Preço sobre <br/>orçamento 
                        </span>
                    }
                </section>

                <span className='carousel-pi-notation'>
                    {
                        lowestPrice ?    
                        `Preços validos até ${new Date(expirationDate).toLocaleDateString()}`
                        :
                        "Faça um orçamento e confira!"
                    }
                </span>
            </main>  
      </div>
    )
}

export default ProductCarouselItem