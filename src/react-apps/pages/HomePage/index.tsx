import * as React from 'react';
import "./styles.css"
import LimpezaProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/LimpezaProducts';
import PadariaProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/PadariaProducts';
import OfertasProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/OfertasProducts';
import CategoriasCarousel from '@/react-apps/components/una/CategoriasCarousel';
import HeadLineCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/HeadLineCarousel';
import LatestProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/LatestProducts';
import { useSelector } from 'react-redux';

export const HomePage: React.FunctionComponent<any> = ({ history }) => {


    return (
        <div id="home-page">
            <div className='app-container home-page-container'>
          
                <HeadLineCarousel/>
                
                <CategoriasCarousel/> 

                <section className='una-home-section'>
                    <h4> Para sua padaria: </h4>
                    <PadariaProductsCarousel/>
                </section> 
 
                <section className='una-home-section'>
                    <h4> Produtos de limpeza: </h4>
                    <LimpezaProductsCarousel/>
                </section> 

                <LatestProductsCarousel/>
            </div> 
        </div>
    )
}

export default HomePage

