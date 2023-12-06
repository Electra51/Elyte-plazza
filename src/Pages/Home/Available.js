import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import SingleProduct from "../AllProducts/SingleProduct";
import LoaderModal from "../Shared/LoaderModal";
import BookingModal from "../BookingModal/BookingModal";

const Available = () => {
  const [productModals, setProductModals] = useState(null);
  const { data: availables } = useQuery({
    queryKey: ["availables"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/addProducts/available"
          // ,
          // {
          // headers: {
          //     authorization: `bearer ${localStorage.getItem('accessToken')}`
          // }
          // }
        );
        const data = await res.json();
        return data;
      } catch (error) { }
    },
  });



  const notify = (e) => {
    toast("Coming soon.......");
  };

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-duration="2300"
        className="max-w-[340px] lg:max-w-6xl mx-auto"
      >
        <div className="text-center mt-20 lg:mt-40">
          <p className="text-[18px] lg:text-2xl font-bold">NEW ARRIVALS</p>
          <p className="mb-20">
            Available Products here that you can select one easily
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 mb-32">
            {availables?.map((product) => {
              return (
                <SingleProduct
                  key={product._id}
                  oneProduct={product}
                  setProductModals={setProductModals}
                />
              );
            })}
          </div>
        </div>


      </div>
      {
        productModals && (
          <LoaderModal
            productModals={productModals}
            setProductModals={setProductModals}
          ></LoaderModal>
        )
      }
      {productModals && (
        <BookingModal
          productModals={productModals}
          setProductModals={setProductModals}
        ></BookingModal>
      )}</>
  );
};

export default Available;
