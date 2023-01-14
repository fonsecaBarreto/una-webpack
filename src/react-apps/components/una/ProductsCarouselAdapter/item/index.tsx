import * as React from 'react';
import "./style.css"
import ProductImage from "@/public/assets/images/product/empty.svg"
import StarImg from "@assets/icons/star.svg"
import { UtilsCarouselTypes } from '@/react-apps/components/utils/Carousel';
import { Product } from '@/domain/views/Product';

const isDateExpired = (date: Date) => {
    const hoje = new Date()
    return hoje > date;
}

const PRESENTATION_CONFIG: any = {
    "weight": { sufix: "kg" },
    "unity": { sufix: "und." },
    "pack": { sufix: "caixa" },
}

export const ProductCarouselItem: React.FunctionComponent<UtilsCarouselTypes.ItemProps<Product>> = (props) =>{
    const  { entry: { data, index }, onChange } = props;
    const { ean, specification, supplies, image,   } = data
    const [ showImage, setShowImage ] = React.useState(false)
    const selectedSupply: any = React.useMemo(()=>{
        if(!supplies || supplies.length == 0) return null;
        const sorted_supplies = ([ ...supplies])
        .sort((a: any, b: any) =>{
            return  ((a?.price >  b?.price) && !isDateExpired(a.expiration)) ? 1 : -1
        }
        );

        return sorted_supplies[0];

    },[ supplies])

    const renderSupply = React.useCallback(() => {

        const presentation_unity = data?.subCategory?.presentation_unity;
        const quantity = data?.quantity_per_unity ?? 1;
        const full_price = selectedSupply?.price ?? 0;
        const prices_presentation_options: any = {
            "weight": (full_price) / ( ( data?.weight ?? 1 ) * (quantity ?? 1)),
            "unity": (full_price / (quantity ?? 1)),
            "pack": full_price
        }
        const result_price =  prices_presentation_options[presentation_unity] ?? full_price;
        const result_price_sufix = PRESENTATION_CONFIG?.[presentation_unity].sufix ?? ""
        const expiration_date_str = new Date(selectedSupply?.expiration).toLocaleDateString().split("T")[0];

        return (
          <section
            className={`product-carousel-item-prices ${
              !selectedSupply ? "no-supply" : ""
            }`}
          >
            <span className="item-unit-price">
              R$: {result_price.toFixed(2) + " "}
              <span className="unidade-preco">
                / {result_price_sufix}
              </span>
            </span>

            <span className="item-full-price">
              Preço total:
              <span className="price-hl">
                {" "}
                R$: {full_price.toFixed(2) + " "}{" "}
              </span>
            </span>

            <span className="carousel-pix-notation">
              {`Preços validos até ${expiration_date_str}`}
            </span>
          </section>
        );
    }, [ selectedSupply, data])


    const renderImage = React.useCallback(() => {

        const captureMedium = (image: string) => {
            const prefix = "https://unacompras-v2-imagens-publicas.s3.amazonaws.com/min/"
            const image_name = image.substring(image.lastIndexOf('/')+1);
            return prefix+(image_name+"").split(".webp")[0]+"-md.webp"
        }

        const { image, specification } = data
        let result_image = captureMedium(image+"");


        const handleImageLoaded = () => {
           setShowImage(true)
        }

        const handleImageErrored = ({ currentTarget }: any) => {
            currentTarget.src=image ?? ProductImage; 
            currentTarget.onerror= null
        }
        
        return (
            <section className='carousel-product-item-img-vp'> 
            
            
                <picture >
                    <img  
                        onLoad={handleImageLoaded}
                        onError={handleImageErrored}
                        alt={`Ilustração do produto ${specification}`} loading='lazy' src={result_image}/>
                </picture>

                {   !showImage && <img alt={`Ilustração do produto ${specification}`} loading='lazy' src={ProductImage}/>  } 
        
            </section>
        )
    },[data, showImage])

  /*   <picture>
            <source srcSet={TestImage2} media="(min-width: 756px)" />
            <img
              className="d-block w-100"
              src={TestImageMd2}
              alt="First slide"
            />
          </picture> */
    return (
        <div className={`carousel-product-item`} onClick={()=>onChange && onChange("OPEN", ean)} >
            <header>
                {renderImage()}
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

                {
                    renderSupply()
                }
            </main>  
      </div>
    )
}

export default ProductCarouselItem