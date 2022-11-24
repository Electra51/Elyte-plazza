import React from 'react';

const Stat = () => {
  return (
    <div>
      <div className='text-center mt-20'>
        <p className="text-2xl font-bold">I am Professional at My Skills</p>
        <p className='mb-10'>More than 2000+ customers trusted me</p>
      </div>
      <div>
        <div className=" shadow grid grid-cols-1 gap-5 lg:grid-cols-4 md:grid-cols-2 items-center rounded-lg my-8 text-gray-900 border-separate">

          <div className="stat place-items-center">
            <p className="stat-title text">Experience</p>
            <p className="stat-value">23+</p>
            <p className="stat-desc">From November 1999 to present</p>
          </div>

          <div className="stat place-items-center">
            <p className="stat-title">Award</p>
            <p className="stat-value text-secondary">102+</p>
            <p className="stat-desc">Award Wins</p>
          </div>
          <div className="stat place-items-center">
            <p className="stat-title">Products</p>
            <p className="stat-value ">99%</p>
            <p className="stat-desc ">Perfect Products</p>
          </div>

          <div className="stat place-items-center">
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