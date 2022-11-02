import * as React from 'react';
import './styles.css'
import Item from "./Item"
import UtilsCarousel from '../../utils/Carousel';
/* imagens */
import AguaSanitariaImg from "@assets/categories/aguasanitaria.webp"
import AmacianteImg from "@assets/categories/amaciante.webp"
import FarinhaImg from "@assets/categories/farinha.webp"
import MisturaboloImg from "@assets/categories/mistura.webp"
import PaoFrancesImg from "@assets/categories/farinha-domestico.webp"
import DesinfetanteImg from "@assets/categories/desinfetante.webp"
import LimpadorImg from "@assets/categories/limpador.webp"
import { useHistory } from 'react-router-dom';


const CATEGORIES = [ 
 
  {
    image: PaoFrancesImg,
    label: "Farinha de trigo Panificação",
    key: "farinha-de-trigo-panificacao"
  },
  {
    image: MisturaboloImg,
    label: "Mistura para bolos",
    key: "mistura-para-bolos"
  },

  {
    image: FarinhaImg,
    label: "Farinha de trigo uso domestico",
    key: "farinha-de-trigo-uso-domestico"
  },
  {
    image: AguaSanitariaImg,
    label: "Agua Sanitaria",
    key: "agua-sanitaria"
  },
  {
    image: AmacianteImg,
    label: "Amaciante",
    key: "amaciante"
  },

  {
    image: DesinfetanteImg,
    label: "Desinfetante",
    key: "desinfetante"
  },

  {
    image: LimpadorImg,
    label: "Limpador Perfumado",
    key: "limpador-perfumado"
  },


]
export const CategoriasCarousel: React.FunctionComponent<any> = () =>{
    const history = useHistory()
    const handleChange = (k: string, p?: any) =>{
      switch(k){
        case "OPEN":
          history.push(`/mercado/?subCategory=${p}`)
        break;
      }
    }

    return (
        <>
            { (CATEGORIES.length) ?
                <div className='categories-carousel'>
                    <UtilsCarousel 
                        onChange={handleChange}
                        height_ration={1.2} 
                        element={Item} 
                        records={CATEGORIES} 
                        colums={[7,6,5,4,3]}/>
                </div>
                : <></>
            }
        </>
    )
}

export default CategoriasCarousel