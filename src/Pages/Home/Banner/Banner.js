import React from 'react';

const Banner = () => {
  return (
    <div className="hero min-h-screen rounded-md" style={{ backgroundImage: `url("https://i.ibb.co/mNxZgVm/1.jpg")` }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome there</h1>
          <p className="mb-5">Icebox is a platform on which you can buy and sell any type of refrigerator! We help people buy and sell.</p>
          <button className="btn btn-warning">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;