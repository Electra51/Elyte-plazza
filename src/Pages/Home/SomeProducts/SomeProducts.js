import React from "react";
import { useQuery } from "@tanstack/react-query";
import SingleProduct from "../../AllProducts/SingleProduct";
import { useState } from "react";
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
  console.log("e", productsSome);
  const [productModals, setProductModals] = useState(null);
  console.log("object", productOver);
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="2300"
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mt-40">
        <p className="text-2xl font-bold">OUR PRODUCTS</p>
        <p className="mb-20">
          Available Products here that you can select one easily
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 mb-32">
          {productsSome.map((product, i) => {
            console.log(product);
            return (
              <SingleProduct
                key={product._id}
                oneProduct={product}
                setProductModals={setProductModals}
              ></SingleProduct>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SomeProducts;
