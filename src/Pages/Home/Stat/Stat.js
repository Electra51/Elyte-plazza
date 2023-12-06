import React from "react";
import img from "../../../assets/images/1.jpg";
const Stat = () => {
  return (
    <div
      className="mt-20 lg:mt-40 bg-blue-300 bg-fixed bg-opacity-40 bg-no-repeat"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-normal gap-32 items-center py-16 px-5">
        <div
          className="text-center text-white"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          <p className="text-[18px] text-black lg:text-white lg:text-2xl font-bold">I AM PROFESSIONAL AT MY SKILLS</p>
          <p className="text-black lg:text-white">More than 2000+ customers trusted me</p>
          <button className="mt-5 px-4 py-2 bg-[#166CDA] rounded-[4px] hover:bg-blue-500">
            Explore more
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 md:grid-cols-2 items-center rounded-lg border-separate">
          <div
            className="stat place-items-center border rounded-md text-white bg-[#156CDA]"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <p className="stat-title text">Experience</p>
            <p className="stat-value">23+</p>
            <p className="stat-desc">From November 1999 to present</p>
          </div>

          <div
            className="stat place-items-center border rounded-md text-white bg-[#156CDA]"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <p className="stat-title">Award</p>
            <p className="stat-value text-red-600">102+</p>
            <p className="stat-desc">Award Wins</p>
          </div>
          <div
            className="stat place-items-center border rounded-md text-white bg-[#156CDA]"
            data-aos="fade-left"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="500"
          >
            <p className="stat-title">Products</p>
            <p className="stat-value ">99%</p>
            <p className="stat-desc ">Perfect Products</p>
          </div>

          <div
            className="stat place-items-center border rounded-md text-white bg-[#156CDA]"
            data-aos="fade-left"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="500"
          >
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
