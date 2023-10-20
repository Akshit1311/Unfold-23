import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type CarouselProps = {};

const CarouselContainer: React.FC<CarouselProps> = () => {
  const adsArr = ["Unfold", "Okto", "Spheron", "Sui"];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      responsive={responsive}
      autoPlay
      showDots={false}
      infinite
      removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
    >
      {adsArr.map((val, i) => (
        <div
          key={i}
          style={{
            backgroundImage: `url(/ads/${val}.png)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="h-96"
        />
      ))}
    </Carousel>
  );
};
export default React.memo(CarouselContainer);
