import * as React from 'react';
import { Carousel } from 'react-bootstrap';
import TestImage from "@assets/headline/headline1-lg.webp"

import TestImageMd from "@assets/headline/headline1-md.webp"

export const HeadLineCarousel: React.FunctionComponent<any> = () =>{
    const [index, setIndex] = React.useState(0);

    const handleSelect = (selectedIndex: number, e: any) => {
      setIndex(selectedIndex);
    };
    
    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect}>

                <Carousel.Item>
                    <picture >
                        <source 
                            srcSet={TestImage}
                            media="(min-width: 756px)"
                        />
                        <img  className="d-block w-100"
                            src={TestImageMd}
                             alt="First slide"
                        />
                    </picture>
                </Carousel.Item>

            </Carousel>
            
        </>
  
    )
}

export default HeadLineCarousel