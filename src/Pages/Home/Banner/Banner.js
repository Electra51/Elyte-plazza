import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../../assets/images/new1.png";
import img2 from "../../../assets/images/new2.png";
import img4 from "../../../assets/images/new4.png";

const Banner = () => {
  return (
    <Carousel autoPlay infiniteLoop showIndicators={false}>
      <div className="relative">
        <img src={img4} />
        <div className="absolute top-5 left-5 lg:absolute lg:top-32 lg:left-52 text-white">
          <p className="text-[12px] lg:text-[22px]">Biggest sale</p>
          <h3 className="text-[17px] lg:text-[50px] font-extrabold">
            Home Appliances
          </h3>
          <p className="text-[12px] lg:text-[30px] font-bold">50% OFF</p>
        </div>
      </div>
      <div className="relative">
        <img src={img1} />
        <div className="absolute top-5 left-5 lg:absolute lg:top-32 lg:left-52 text-white">
          <p className="text-[12px] lg:text-[22px]">Biggest sale</p>
          <h3 className="text-[17px] lg:text-[50px] font-extrabold">
            Cool Refrigerators
          </h3>
          <p className="text-[12px] lg:text-[30px] font-bold">15% OFF</p>
        </div>
      </div>
      <div className="relative">
        <img src={img2} />
        <div className="absolute top-5 right-5 lg:absolute lg:top-32 lg:right-52 text-white">
          <p className="text-[12px] lg:text-[22px]">Biggest sale</p>
          <h3 className="text-[17px] lg:text-[50px] font-extrabold">
            LED Televisions
          </h3>
          <p className="text-[12px] lg:text-[30px] font-bold">20% OFF</p>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
