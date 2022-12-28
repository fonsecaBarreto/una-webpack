import * as React from 'react';

import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import ProductFeed from '@/react-apps/pages/mart-page/ProductFeed'
import UseFetchManager from './FetchManager'
import CategoriasNav from './CategoriasNav'
import LatestProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/LatestProducts';
import GlobalContext from '@/react-apps/apps/GlobalContext';

export const MartPage: React.FunctionComponent<any> = ({ history }) => {
    const context = React.useContext(GlobalContext);
    const fetchManager = UseFetchManager();

    React.useEffect(()=>{
        context.app.current?.scrollTo({ top: 0, behavior: 'auto'}); 
    },[fetchManager.values])

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

