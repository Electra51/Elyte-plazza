import React from 'react';

const Stat = () => {
  return (
    <div>
      <div className='text-center mt-40' data-aos="fade-up"
     data-aos-duration="3000">
        <p className="text-2xl font-bold">I AM PROFESSIONAL AT MY SKILLS</p>
        <p className='mb-20'>More than 2000+ customers trusted me</p>
      </div>
      <div className='bg-base-100'>
        <div className=" shadow grid grid-cols-1 gap-5 lg:grid-cols-4 md:grid-cols-2 items-center rounded-lg my-8 border-separate">

          <div className="stat place-items-center border rounded-md" data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
            <p className="stat-title text">Experience</p>
            <p className="stat-value">23+</p>
            <p className="stat-desc">From November 1999 to present</p>
          </div>

          <div className="stat place-items-center border rounded-md" data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
            <p className="stat-title">Award</p>
            <p className="stat-value text-orange-600">102+</p>
            <p className="stat-desc">Award Wins</p>
          </div>
          <div className="stat place-items-center border rounded-md" data-aos="fade-left"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="500">
            <p className="stat-title">Products</p>
            <p className="stat-value ">99%</p>
            <p className="stat-desc ">Perfect Products</p>
          </div>

          <div className="stat place-items-center border rounded-md" data-aos="fade-left"
     data-aos-anchor="#example-anchor"
     data-aos-offset="500"
     data-aos-duration="500">
            <p className="stat-title">Client</p>
            <p className="stat-value">36k</p>
            <p className="stat-desc">Happy Clients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stat;