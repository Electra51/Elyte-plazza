import React, { useState } from "react";
import BookingModal from "../BookingModal/BookingModal";
import SingleProduct from "./SingleProduct";
import { IoMdSearch } from "react-icons/io";
import Pagination from "../Shared/Pagination";
import { useQuery } from "@tanstack/react-query";

const OverAllProducts = () => {
  const [productModals, setProductModals] = useState(null);
  const [searchQueryAllProduct, setSearchQueryForAllProduct] = useState("");
  const [selectedYearOfUse, setSelectedYearOfUse] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(0);

  const { data: productOver = [] } = useQuery({
    queryKey: ["productOver"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      return data;
    },
  });

  const productTypes = Array.from(
    new Set(productOver?.map((e) => e?.category_id))
  );
  const allProductss = productOver?.filter((product) => {
    const matchesSearch = product?.item_name
      ?.toLowerCase()
      .includes(searchQueryAllProduct.toLowerCase());

    const matchesType =
      typeFilter === "all" || product?.category_id === typeFilter;
    const matchesYearOfUse = () => {
      if (selectedYearOfUse === "all") {
        return true;
      } else if (selectedYearOfUse === "0-1") {
        return product?.year_of_use <= 1;
      } else if (selectedYearOfUse === "1-2") {
        return product?.year_of_use > 1 && product?.year_of_use <= 2;
      } else if (selectedYearOfUse === "2-3") {
        return product?.year_of_use > 2 && product?.year_of_use <= 3;
      } else if (selectedYearOfUse === "more") {
        return product?.year_of_use > 3;
      }
      return false;
    };

    return matchesSearch && matchesType && matchesYearOfUse();
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
          </div>
          <div className="mt-6">
            <p className="mb-2">Year of Use:</p>
            <hr />
            <div className="my-3">
              {["all", "0-1", "1-2", "2-3", "more"].map((year, index) => (
                <p
                  key={index}
                  className={`cursor-pointer ${
                    selectedYearOfUse === year ? "font-bold" : ""
                  }`}
                  onClick={() => setSelectedYearOfUse(year)}
                >
                  {year === "all"
                    ? "All"
                    : year === "0-1"
                    ? "0-1 year"
                    : year === "1-2"
                    ? "1-2 years"
                    : year === "2-3"
                    ? "2-3 years"
                    : "More than 3 years"}
                </p>
              ))}
            </div>

            <p className="mb-2">Categories:</p>
            <hr />
            <div className="flex flex-wrap gap-2 justify-stretch items-center mt-3 pb-6">
              {productTypes?.map((type, index) => (
                <div
                  className={`px-2 py-1 rounded-[4px] text-black border border-[#156CDA] cursor-pointer text-[13px] ${
                    typeFilter === type ? "bg-[#156CDA] text-white" : "bg-white"
                  }`}
                  onClick={() => setTypeFilter(type)}
                  key={index}
                >
                  {type == "1"
                    ? "Televisions (TV)"
                    : type == "2"
                    ? "Refrigerators & Freezers"
                    : type == "3"
                    ? "Washing Machines"
                    : type == "4"
                    ? "Microwave & Electric Oven"
                    : type == "5"
                    ? "Air Conditioner"
                    : type == "6"
                    ? "Room Heaters"
                    : type == "7"
                    ? "Blender & Mixer Grinder"
                    : ""}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 my-10 col-span-3">
          {allProductss &&
            allProductss
              .slice(6 * page, 6 * (page + 1))
              .map((product) => (
                <SingleProduct
                  key={product._id}
                  oneProduct={product}
                  setProductModals={setProductModals}
                />
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

export default OverAllProducts;
