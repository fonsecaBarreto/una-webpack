import * as React from 'react';
import "./styles.css"
import LimpezaProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/LimpezaProducts';
import PadariaProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/PadariaProducts';
import OfertasProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/OfertasProducts';
import CategoriasCarousel from '@/react-apps/components/una/CategoriasCarousel';
import HeadLineCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/HeadLineCarousel';
import LatestProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/LatestProducts';

export const HomePage: React.FunctionComponent<any> = ({ history }) => {

    return (
        <div id="home-page">
            <div className='app-container home-page-container'>
                
                <HeadLineCarousel/>
                <CategoriasCarousel/>


                <section>
                    <h5> Produtos de limpeza em alta: </h5>
                    <LimpezaProductsCarousel/>
                </section>


                <section>
                    <h5> Produtos de Padaria em alta: </h5>
                    <PadariaProductsCarousel/>
                </section>

{/* 
                <section>
                    <h2> Ofertas Imperdiveis </h2>
                    <OfertasProductsCarousel/>
                </section>

                <section>
                    <h5> ultimos acessos: </h5>
                    <LatestProductsCarousel/>
                </section> */}
                
            </div> 
        </div>
    )
}

export default HomePage

