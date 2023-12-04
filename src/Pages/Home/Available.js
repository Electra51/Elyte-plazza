import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

const Available = () => {
  const { data: availables } = useQuery({
    queryKey: ["availables"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://icebox-server.vercel.app/addProducts/available"
          // ,
          // {
          // headers: {
          //     authorization: `bearer ${localStorage.getItem('accessToken')}`
          // }
          // }
        );
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });

  const notify = (e) => {
    toast("Coming soon.......");
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="2300"
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mt-40">
        <p className="text-2xl font-bold">NEW ARRIVALS</p>
        <p className="mb-20">
          Available Products here that you can select one easily
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 mb-32">
          {availables?.map((available) => (
            <div
              className="h-96 bg-gray-200 shadow-xl relative"
              key={available._id}
            >
              <figure className="p-3 pt-4 h-40">
                <img
                  src={available.image}
                  alt="Shoes"
                  className="rounded-xl h-full w-full object-contain"
                />
              </figure>
              <div className="absolute top-2 left-2">
                <div className="flex justify-center items-center gap-1 px-2 rounded-[4px] bg-green-600 text-white font-normal text-[14px]">
                  {" "}
                  <p>new</p>
                </div>
              </div>
              <div className="card-body pt-6 h-40 items-center text-center text-black">
                <h2 className="card-title">{available.name}</h2>
                <p>Price: ${available.price}</p>
                <p>Condition: {available.condition}</p>
                <p>Year of use: {available.year}</p>

                <div className="card-actions">
                  {
                    <button
                      onClick={notify}
                      className="bg-[#0246b0] text-white px-4 py-1 rounded-[4px]"
                    >
                      Buy Now
                    </button>
                  }{" "}
                  <div className="hover:bg-[#0246b0] border border-[#0246b0] h-8 w-8 rounded-full text-[#0246b0] flex justify-center items-center hover:text-white font-semibold">
                    <IoCartOutline />
                  </div>
                  <div className="hover:bg-[#0246b0] border border-[#0246b0] h-8 w-8 rounded-full text-[#0246b0] flex justify-center items-center hover:text-white">
                    <FaRegHeart />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Available;
