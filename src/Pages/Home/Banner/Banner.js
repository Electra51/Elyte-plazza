import React from 'react';

const Banner = () => {
  return (
    
    <div className="hero min-h-screen rounded-md mt-3" style={{ backgroundImage: `url("https://media.istockphoto.com/id/1196619704/vector/refrigerator-full-of-various-food.jpg?s=612x612&w=0&k=20&c=dUXyAONssqHpWJXfHFOrOJyMwZ1PcYT-BIwwHeCMoPs=")` }} data-aos="zoom-in-up" data-aos-duration="3000">
       <div className="hero-overlay bg-opacity-60 rounded-md"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome there</h1>
          <p className="mb-5">Icebox is a platform on which you can buy and sell any type of refrigerator! We help people buy and sell.</p>
          <button className="btn btn-warning"><a href="#categories">Get Started</a></button>
        </div>
      </div>
    </div>
  );
};

export default Banner;