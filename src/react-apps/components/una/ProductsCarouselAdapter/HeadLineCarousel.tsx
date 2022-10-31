import * as React from 'react';
import { Carousel } from 'react-bootstrap';
import TestImage from "@assets/test-lg.jpg"
import TestImageMd from "@assets/test-md.jpg"

export const HeadLineCarousel: React.FunctionComponent<any> = () =>{
    const [index, setIndex] = React.useState(0);

    const handleSelect = (selectedIndex: number, e: any) => {
      setIndex(selectedIndex);
    };
    
    return (
        <>
            <Carousel activeIndex={index} onSelect={handleSelect}>

                <Carousel.Item>

                    <img
                        className="d-block w-100"
                        alt="First slide"
                        src={TestImage}
                   /*      srcset={`${TestImage} 480w, elva-fairy-800w.jpg 800w`} */
                        sizes="(max-width: 600px) 480px, 800px"/>

                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={TestImage}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={TestImage}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            
        </>
  
    )
}

export default HeadLineCarousel