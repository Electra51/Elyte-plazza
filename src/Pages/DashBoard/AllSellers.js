import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../Shared/ConfirmationModal";
import Loading from "../Shared/Loading";
import { BiBadgeCheck } from "react-icons/bi";
import Pagination from "../Shared/Pagination";
import { IoMdSearch } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineEmail } from "react-icons/md";

const AllSellers = () => {
  const [deletingSeller, setDeletingSeller] = useState([null]);
  const [searchQueryForSeller, setSearchQueryForSeller] = useState("");
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const closeModal = () => {
    setDeletingSeller(null);
  };

  const {
    data: sellers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://icebox-server.vercel.app/users/seller"
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

  //handleMakeAvailable
  const handleMakeVerified = (id) => {
    fetch(`https://icebox-server.vercel.app/users/verify/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Make verified.");
          refetch();
          // navigate('/Available')
        }
      });
  };

  const handleDeleteSeller = (seller) => {
    // console.log(seller);
    fetch(`https://icebox-server.vercel.app/users/${seller._id}`, {
      method: "DELETE",
      // ,
      // headers: {
      //     authorization: `bearer ${localStorage.getItem('accessToken')}`
      // }
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Buyer ${seller.name} deleted successfully`);
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  const sellerProduct = sellers?.filter((seller) => {
    const matchesSearch = seller?.name
      ?.toLowerCase()
      .includes(searchQueryForSeller.toLowerCase());

    return matchesSearch;
  });

  localStorage.setItem("totalSellers", sellers?.length);

  return (
    <div className="px-10 mt-[90px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {" "}
          <h3 className="text-xl mb-5">All Seller:</h3>
          <div className="relative flex items-center h-9 mr-2 bg-white overflow-hidden border border-[#0047af]">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <IoMdSearch className="text-[#0047af] font-medium text-xl" />
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-[#0047af] pr-2"
              type="text"
              id="search"
              onChange={(e) => {
                setSearchQueryForSeller(e.target.value);
                setPage(0);
              }}
              placeholder="Search buyer..."
            />
          </div>
        </div>
        <Pagination
          length={sellerProduct?.length}
          page={page}
          setPage={setPage}
        />
      </div>
      <div className="overflow-x-auto mt-3 grid grid-cols-3 gap-6 px-5 pb-5 ">
        {sellerProduct?.slice(6 * page, 6 * (page + 1)).map((seller, i) => (
          <div
            key={i}
            className="mt-5 py-5 px-4 group hover:bg-[#0046ac] hover:text-white hover:bg-opacity-70"
            style={{ boxShadow: "rgb(119 119 119 / 19%) 0px 5px 15px" }}
          >
            <div className="flex justify-between items-center">
              {seller?.type !== "verified" && (
                <button
                  onClick={() => handleMakeVerified(seller._id)}
                  className="bg-[#0046ac] rounded-[4px] text-[14px] py-0.5 px-2 text-white mb-1"
                >
                  Verify
                </button>
              )}
              {seller?.type === "verified" && (
                <span className="text-green-500 font-medium text-[14px] flex items-center">
                  Verified <BiBadgeCheck />
                </span>
              )}
              <div className="flex justify-center items-center">
                <label
                  onClick={() => setDeletingSeller(seller)}
                  htmlFor="confirmation-modal"
                  className="text-red-500 cursor-pointer group-hover:text-white"
                >
                  <MdDeleteOutline />
                </label>
              </div>{" "}
            </div>
            <hr className="mt-1" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex justify-start items-center gap-3 mt-1">
                <FaUserPlus />
                <p className="font-semibold text-[16px]">
                  {seller.name.charAt(0).toUpperCase() + seller.name.slice(1)}
                </p>
              </div>
            </div>{" "}
            <div className="flex gap-2 items-center mt-1">
              {" "}
              <MdOutlineEmail />
              <p className="ml-1 text-[14.5px]"> {seller.email}</p>
            </div>
          </div>
        ))}
      </div>
      {deletingSeller && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingSeller.name}. It cannot be undone.`}
          successAction={handleDeleteSeller}
          successButtonName="Delete"
          modalData={deletingSeller}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default AllSellers;
