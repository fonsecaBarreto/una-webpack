import * as React from 'react';

import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import ProductFeed from '@/react-apps/pages/mart-page/ProductFeed'
import UseFetchManager from './FetchManager'
import CategoriasNav from './CategoriasNav'
import LatestProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/LatestProducts';
import { useHistory } from 'react-router-dom';
import LimpezaProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/LimpezaProducts';
import PadariaProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/PadariaProducts';
import OfertasProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/OfertasProducts';
import CategoriasCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/CategoriesCarousel';
import HeadLineCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/HeadLineCarousel';

export const MartPage: React.FunctionComponent<any> = ({ history }) => {

    const fetchManager = UseFetchManager();

    return (
        <div id="departamento-page">
            <div className='app-container'>
                
                <ContentGrid loading={fetchManager.isLoading}>
                   <CategoriasNav manager={fetchManager}></CategoriasNav> 
                    <ProductFeed manager={fetchManager} ></ProductFeed>
                </ContentGrid> 


                <section>
                    <h5> ultimos acessos: </h5>
                    <LatestProductsCarousel/>
                </section>
                
            </div> 
        </div>
    )
}

export default MartPage

