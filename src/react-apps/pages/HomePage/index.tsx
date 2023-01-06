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

    const bottomRef = React.useRef<HTMLDivElement | any>(null);
    const { isIntersecting } = useIntersectionObserver(bottomRef, {  }, false);
    const [ showContent, setShowContent ] = React.useState(false);

    React.useEffect(()=>{
        if(isIntersecting == true){
            setShowContent(true)
        }
    },[ isIntersecting])

    return (
        <div id="home-page">
            <header className='app-container home-page-container'>
                <HeadLineCarousel/>

            </header>
            <div className='app-container home-page-container'>
        
                <CategoriasCarousel/>
            {
                showContent && 
                <>
                <section className='una-home-section'>
                    <h4> Laticinios: </h4>
                    <LaticiniosProductsCarousel/>
                </section> 
                
                <section className='una-home-section'>
                    <h4> Para sua padaria: </h4>
                    <PadariaProductsCarousel/>
                </section> 
 
                <section className='una-home-section'>
                    <h4> Doces: </h4>
                    <ConfeitareProductsCarousel/>
                </section> 

                <section className='una-home-section'>
                    <h4> Produtos de limpeza: </h4>
                    <LimpezaProductsCarousel/>
                </section> 

                <LatestProductsCarousel/>
                </>
                
            }
                
            </div> 
            <div  ref={bottomRef}> </div>
        </div>
    )
}

export default HomePage

