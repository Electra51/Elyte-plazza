import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../BookingModal/BookingModal";
import SingleProduct from "./SingleProduct";
import { IoMdSearch } from "react-icons/io";
import Pagination from "../Shared/Pagination";
import { useQuery } from "@tanstack/react-query";
const AllProducts = () => {
  const loaderData = useLoaderData();
  const products = loaderData;
  const [productModals, setProductModals] = useState(null);
  const [searchQueryAllProduct, setSearchQueryForAllProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(0);

  const allProductss = products?.filter((product) => {
    const matchesSearch = product?.item_name
      ?.toLowerCase()
      .includes(searchQueryAllProduct.toLowerCase());

    return matchesSearch;
  });
  const { data: productCategories = [] } = useQuery({
    queryKey: ["productCategories"],
    queryFn: async () => {
      const res = await fetch("https://icebox-server.vercel.app/categories");
      const data = await res.json();
      return data;
    },
  });


  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="flex justify-between items-center gap-3 mt-6">
        <h3 className="text-xl mb-5">All Product:</h3>
        <Pagination
          length={allProductss?.length}
          page={page}
          setPage={setPage}
        />
      </div>

      <div className="grid grid-cols-4 gap-20">
        <div>
          <div className="relative flex items-center h-9 mr-2 bg-white overflow-hidden border border-[#0047af] mt-8">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <IoMdSearch className="text-[#0047af] font-medium text-xl" />
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-[#0047af] pr-2"
              type="text"
              id="search"
              onChange={(e) => {
                setSearchQueryForAllProduct(e.target.value);
                setPage(0);
              }}
              placeholder="Search products..."
            />
          </div>{" "}
          <div className="mt-6">
            {productCategories?.map((e, i) => {

              return (
                <div key={i}
                // onClick={() => {
                //   setSelectedCategory(e.name);
                //   setPage(0);
                // }}
                >
                  {e.subCategory?.map((ea, i) => {
                    return <p key={i}>{ea.subName}</p>;
                  })}
                  {!e.subCategory ? <p>{e.name}</p> : ""}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 my-10 col-span-3">
          {allProductss.slice(6 * page, 6 * (page + 1)).map((product) => (
            <SingleProduct
              key={product._id}
              oneProduct={product}
              setProductModals={setProductModals}
            ></SingleProduct>
          ))}
        </div>
      </div>
      {productModals && (
        <BookingModal
          productModals={productModals}
          setProductModals={setProductModals}
        ></BookingModal>
      )}
    </div>
  );
};

export default AllProducts;
