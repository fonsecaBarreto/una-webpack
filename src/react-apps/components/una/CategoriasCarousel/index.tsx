import * as React from 'react';
import './styles.css'
import Item from "./Item"
import UtilsCarousel from '../../utils/Carousel';
/* imagens */
import AmacianteImg from "@assets/categories/amaciante.webp"
import AguaSanitariaImg from "@assets/categories/aguasanitaria.webp"
import MisturaboloImg from "@assets/categories/mistura.webp"
import DesinfetanteImg from "@assets/categories/desinfetante.webp"
import QueijosImg from "@assets/categories/queijos.webp"
import LimpadorImg from "@assets/categories/limpador.webp"
import WineImage from "@assets/categories/wine.webp"
import MilkImage from "@assets/categories/mlik.webp"
import CakeIamge from "@assets/categories/cake.webp"
import ButterImage from "@assets/categories/butter.webp"
import { useHistory } from 'react-router-dom';


const CATEGORIES = [ 
 
  {
    image: QueijosImg,
    label: "Queijos",
    key: "?category=queijos"
  },
  
  {
    image: MilkImage,
    label: "Leites",
    key: "?category=leites"
  },
  {
    image: ButterImage,
    label: "Manteigas",
    key: "?subCategory=manteigas"
  },

  {
    image: WineImage,
    label: "Vinhos",
    key: "?subCategory=vinhos"
  },


  {
    image: MisturaboloImg,
    label: "Mistura para bolos",
    key: "?subCategory=mistura-para-bolos"
  },
  {
    image: CakeIamge,
    label: "Doces e recheios",
    key: "?category=doces-e-recheios"
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