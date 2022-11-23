import React from 'react';
import img1 from '../../../assets/images/2.png'
import img2 from '../../../assets/images/3.png'

import BannerItem from './BannerItem';


const bannerData = [
  {
        image: img1,
      para:'A refrigerator is an open system that dispels heat from a closed space to a warmer area, usually a kitchen or another room. ',
      text:'Welcome to IceBox site',
    prev: 2,
    id: 1,
    next: 2
  },
    {
        para:'Refrigeration is an essential food storage technique around the world. The lower temperature lowers the reproduction rate of bacteria',
        text:'Get your need easily',
    image: img2,
    prev: 1,
    id: 2,
    next: 1
  }

  
]



const Banner = () => {
  return (
    
      <div className="carousel w-full py-5">
        {
          bannerData.map(slide => <BannerItem
            key={slide.id}
           slide={slide}>
            
          </BannerItem>)
      }
      </div>
    
  );
};

export default Banner;

