import * as React from 'react';

import ContentGrid from '@/react-apps/layouts/components/ContentGrid'
import ProductFeed from '@/react-apps/pages/mart-page/ProductFeed'
import UseFetchManager from './FetchManager'
import CategoriasNav from './CategoriasNav'
import ProductsCarouselAdapter from '@/react-apps/components/una/ProductsCarouselAdapter';
import UtilsCarousel, { UtilsCarouselTypes } from '@/react-apps/components/utils/Carousel';
import { useHistory } from 'react-router-dom';

export const TestItem: React.FunctionComponent<UtilsCarouselTypes.ItemProps<any>>= (props) =>{

    let { entry: { data, index }, onChange } = props;

    const history = useHistory()
    const handleClick = (k: any) =>{
        return history.push(`/produto/${data.ean}`);
    }

    return (
        <div className={`latest-product-item`} onClick={handleClick} >
                <section>
                   
                </section>
                <section className='lpi-body' onClick={()=>{ handleClick("MOVE")}}>
                    <span className="lpi-produto-nome"> {data.specification} </span>
                    <span className="lpi-produto-ean"> {data.ean}</span>
                </section>  
        </div>
    )
    
}
export const MartPage: React.FunctionComponent<any> = ({ history }) => {

    const fetchManager = UseFetchManager();

    return (
        <div id="departamento-page">
            <div className='app-container'>

                {/* <section>
                    <h4> Os Mais Pedidos: </h4>
                    <UtilsCarousel element={TestItem} records={[2,3,3,3,3]} colums={[3, 3, 3, 2, 1]} viewport_height={220} /> 
                </section>

                <section>
                    <h4> Produtos de limpeza em alta: </h4>
                    <UtilsCarousel element={TestItem} records={[2,3,5,5,5]} viewport_height={220} /> 
                </section> */}

               
                {/* <ContentGrid loading={fetchManager.isLoading}>
                   <CategoriasNav manager={fetchManager}></CategoriasNav> 
                    <ProductFeed manager={fetchManager} ></ProductFeed>
                </ContentGrid>   */}
                <div>
                    <ProductsCarouselAdapter/>
                </div>

              {/*   <section>
                    <h4> Produtos de Padaria em alta: </h4>
                    <UtilsCarousel element={TestItem} records={[2,3,5,5,5]} viewport_height={220} /> 
                </section> */}
            </div> 
        </div>
    )
}

export default MartPage

