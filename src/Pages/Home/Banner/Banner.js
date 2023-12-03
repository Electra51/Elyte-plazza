import React from "react";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from "../../../assets/images/new1.png"
import img2 from "../../../assets/images/new2.png"
import img3 from "../../../assets/images/new3.png"
import img4 from "../../../assets/images/new4.png"

const Banner = () => {
  return (

    <Carousel autoPlay infiniteLoop showIndicators={false}>
      <div>
        <img src={img4} />
      </div>
      <div>
        <img src={img1} />
      </div>
      <div>
        <img src={img2} />
      </div>
      <div>
        <img src={img3} />
      </div>
    </Carousel>
  );
};

export default Banner;
