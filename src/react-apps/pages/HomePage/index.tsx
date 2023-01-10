import * as React from 'react';
import "./styles.css"
import LimpezaProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/LimpezaProducts';
import PadariaProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/PadariaProducts';
import CategoriasCarousel from '@/react-apps/components/una/CategoriasCarousel';
import HeadLineCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/HeadLineCarousel';
import LatestProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/LatestProducts';
import ConfeitareProductsCarousel from '@/react-apps/components/una/ProductsCarouselAdapter/ConfeitareProducts';
import LaticiniosProductsCarousel, { JokerProductsCarousel } from '@/react-apps/components/una/ProductsCarouselAdapter/LaticiniosProducts';
import useIntersectionObserver from '@/react-apps/components/utils/useIntersectionObserver';
import ModalUnaLoading from '@/react-apps/layouts/components/ModalLoading';
export const HomePage: React.FunctionComponent<any> = ({ history }) => {

    const firstStage = React.useRef<HTMLDivElement | any>(null);
    const secondStage = React.useRef<HTMLDivElement | any>(null);

    const { isIntersecting: isStage1 } = useIntersectionObserver(firstStage, {  }, false);
    const { isIntersecting: isStage2 } = useIntersectionObserver(secondStage, {  }, false);
    const [ stage, setStage ] = React.useState(0);

    React.useEffect(()=>{
        if(stage == 0 && isStage1 == true){
            setStage(1)
        }
        if(stage == 1 && isStage2 == true){
            setStage(2)
        }
    },[ isStage2, isStage1])

    return (
      <div id="home-page">
        <header className="app-container home-page-container">
          <HeadLineCarousel />
        </header>
        <div className="app-container home-page-container">
          <CategoriasCarousel />

          <span ref={firstStage}></span>

          {stage >= 1 ? (
            <>
              <section className="una-home-section">
                <h4> Queijos: </h4>
                <JokerProductsCarousel 
                    columns={[5,5,4,3,2]}
                    q_params={{ categories: ["queijos"] }} />
              </section>

              <section className="una-home-section">
                <h4> Bebidas: </h4>
                <JokerProductsCarousel 
                    q_params={{ categories: ["alcoolicas", "nao-alcoolicas"] }} />
              </section>


              <section className="una-home-section">
                <h4> Embutidos: </h4>
                <JokerProductsCarousel q_params={{ categories: ["embutidos-defumados-e-salgados"] }} />
              </section>
         
            </>
          )
          :
            <ModalUnaLoading/>
        
        }

          <span ref={secondStage}></span>
          {stage >= 2 ? (
            <>
              <section className="una-home-section">
                <h4> Doces: </h4>
                <ConfeitareProductsCarousel />
              </section>

              <section className="una-home-section">
                <h4> Para sua padaria: </h4>
                <PadariaProductsCarousel />
              </section>

              <section className="una-home-section">
                <h4> Produtos de limpeza: </h4>
                <LimpezaProductsCarousel />
              </section>


              <LatestProductsCarousel />
            </>
          )
          :
          <ModalUnaLoading/>
          }
        </div>
      </div>
    );
}

export default HomePage

