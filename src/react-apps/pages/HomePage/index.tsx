import * as React from 'react';
import "./styles.css"
import LimpezaProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/LimpezaProducts';
import PadariaProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/PadariaProducts';
import OfertasProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/OfertasProducts';
import CategoriasCarousel from '@/react-apps/components/una/CategoriasCarousel';
import HeadLineCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/HeadLineCarousel';
import LatestProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/LatestProducts';
import { useSelector } from 'react-redux';
import ConfeitareProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/ConfeitareProducts';
import LaticiniosProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/LaticiniosProducts';
import useIntersectionObserver from '@/react-apps/components/utils/useIntersectionObserver';

export const HomePage: React.FunctionComponent<any> = ({ history }) => {

    const firstStage = React.useRef<HTMLDivElement | any>(null);
    const secondStage = React.useRef<HTMLDivElement | any>(null);

    const { isIntersecting: isStage1 } = useIntersectionObserver(firstStage, {  }, false);
    const { isIntersecting: isStage2 } = useIntersectionObserver(secondStage, {  }, false);
    const [ stage, setStage ] = React.useState(0);

    React.useEffect(()=>{
        console.log([isStage1, isStage2])
        if(stage == 0 && isStage1 == true){
            setStage(1)
        }
        if(stage == 1 && isStage2 == true){
            setStage(2)
        }

        console.log(stage)
    },[ isStage2, isStage1])

    return (
        <div id="home-page">
            <header className='app-container home-page-container'>
                <HeadLineCarousel/>
        
            </header>
            <div className='app-container home-page-container'>
        
                <CategoriasCarousel/>

                <div ref={firstStage}></div>
                
                {  stage >= 1 &&
                    <>
                        <section className='una-home-section'>
                            <h4> Laticinios: </h4>
                            <LaticiniosProductsCarousel/>
                        </section> 


                        <section className='una-home-section'>
                            <h4> Para sua padaria: </h4>
                            <PadariaProductsCarousel/>
                        </section> 

                      
                    </>
                }

                <div ref={secondStage}></div>
                { stage >= 2 && <>

                    <section className='una-home-section'>
                        <h4> Doces: </h4>
                        <ConfeitareProductsCarousel/>
                    </section> 

                    <section className='una-home-section'>
                        <h4> Produtos de limpeza: </h4>
                        <LimpezaProductsCarousel/>
                    </section> 

                    <LatestProductsCarousel/>
                </>}
            

            </div> 
          {/*   <div  ref={bottomRef}> </div> */}
        </div>
    )
}

export default HomePage

