import React from "react";
import { useQuery } from "@tanstack/react-query";
import SingleProduct from "../../AllProducts/SingleProduct";
import { useState } from "react";
import LoaderModal from "../../Shared/LoaderModal";
import { Link } from "react-router-dom";
import BookingModal from "../../BookingModal/BookingModal";

const SomeProducts = () => {

  const { data: productOver = [] } = useQuery({
    queryKey: ["productOver"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      return data;
    },
  });
  const productsSome = productOver?.slice(0, 4).map((e) => e);
  const [productModals, setProductModals] = useState(null);

  return (
    <div>
      <div
        data-aos="fade-up"
        data-aos-duration="2300"
        className="max-w-[340px] lg:max-w-6xl mx-auto"
      >
        <div className="text-center mt-20 lg:mt-40 relative">
          <p className="text-[18px] lg:text-2xl font-bold">OUR PRODUCTS</p>
          <Link to="/category">   <button className="invisible lg:visible text-[#166CDA] absolute top-5 right-0">See more products...</button></Link>
          {/* <button className="text-[#166CDA] absolute top-5 right-0">See more products...</button> */}
          <p className="mb-10 lg:mb-20">
            Available Products here that you can select one easily
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 mb-32">
            {productsSome.map((product, i) => {

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
      )}
    </div>
  );
};

export default SomeProducts;
