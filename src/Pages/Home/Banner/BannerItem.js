import React from 'react';
import './BannerItem.css';



const BannerItem = ({ slide }) => {
  const { image, id, prev, next, text, para } = slide;
  return (

    <div id={`slide${id}`} className="carousel-item relative w-full">
      <div className='carousel-image'>
        <img src={image} alt="" className="w-full rounded-xl" />
      </div>
      <div className="absolute transform -translate-y-1/2 left-20 top-1/3">
        <h1 className='text-4xl font-bold text-white'>{text}</h1>
        <br />
        <p className='text-xl w-3/6 text-white'>{para}</p>
        <br />
        <button className="btn btn-warning ">Discover More</button>
      </div>


      <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
        <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a>
        <a href={`#slide${next}`} className="btn btn-circle">❯</a>
      </div>
    </div>

  );
};

export default BannerItem;