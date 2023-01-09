import * as React from "react";
import { Carousel } from "react-bootstrap";
import TestImage2 from "@assets/headline/headline-lg.webp";
import TestImageMd2 from "@assets/headline/headline2-md.webp";


export const HeadLineCarousel: React.FunctionComponent<any> = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    //preloading image
      const img = new Image();
      img.src = TestImage2;
  }, []);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <picture>
            <source srcSet={TestImage2} media="(min-width: 756px)" />
            <img
              className="d-block w-100"
              src={TestImageMd2}
              alt="First slide"
            />
          </picture>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default HeadLineCarousel;
