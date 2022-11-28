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
import QueijosImg from "@assets/categories/queijos.webp"
import LimpadorImg from "@assets/categories/limpador.webp"
import { useHistory } from 'react-router-dom';


const CATEGORIES = [ 
 
  {
    image: QueijosImg,
    label: "Queijos",
    key: "?category=queijos"
  },
  {
    image: FarinhaImg,
    label: "Farinha de trigo Panificação",
    key: "?subCategory=farinha-de-trigo-panificacao"
  },
  {
    image: MisturaboloImg,
    label: "Mistura para bolos",
    key: "?subCategory=mistura-para-bolos"
  },

  {
    image: PaoFrancesImg,
    label: "Farinha de trigo uso domestico",
    key: "?subCategory=farinha-de-trigo-uso-domestico"
  },
  {
    image: AguaSanitariaImg,
    label: "Agua Sanitaria",
    key: "?subCategory=agua-sanitaria"
  },
  {
    image: AmacianteImg,
    label: "Amaciante",
    key: "?subCategory=amaciante"
  },

  {
    image: DesinfetanteImg,
    label: "Desinfetante",
    key: "?subCategory=desinfetante"
  },

  {
    image: LimpadorImg,
    label: "Limpador Perfumado",
    key: "?subCategory=limpador-perfumado"
  },


]
export const CategoriasCarousel: React.FunctionComponent<any> = () =>{
    const history = useHistory()
    const handleChange = (k: string, p?: any) =>{
      switch(k){
        case "OPEN":
          history.push(`/mercado/${p}`)
        break;
      }
    }

    return (
        <>
            { (CATEGORIES.length) ?
                <div className='categories-carousel'>
                    <UtilsCarousel 
                        onChange={handleChange}
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