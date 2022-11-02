import * as React from 'react';

import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import ProductFeed from '@/react-apps/pages/mart-page/ProductFeed'
import UseFetchManager from './FetchManager'
import CategoriasNav from './CategoriasNav'
import LatestProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/LatestProducts';

export const MartPage: React.FunctionComponent<any> = ({ history }) => {

    const fetchManager = UseFetchManager();

    return (
        <div id="departamento-page">
            <div className='app-container'>
                
                <ContentGrid loading={fetchManager.isLoading}>
                   <CategoriasNav manager={fetchManager}></CategoriasNav> 
                    <ProductFeed manager={fetchManager} ></ProductFeed>
                </ContentGrid> 

                <LatestProductsCarousel/>
                
            </div> 
        </div>
    )
}

export default MartPage

