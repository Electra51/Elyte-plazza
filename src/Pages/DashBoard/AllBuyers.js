import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../Shared/ConfirmationModal";
import Loading from "../Shared/Loading";
import { IoMdSearch } from "react-icons/io";
import Pagination from "../Shared/Pagination";
import { MdDeleteOutline, MdOutlineEmail } from "react-icons/md";
import { FiUsers } from "react-icons/fi";

const AllBuyers = () => {
  const [deletingBuyer, setDeletingBuyer] = useState([null]);
  const navigate = useNavigate();
  const [searchQueryForBuyer, setSearchQueryForBuyer] = useState("");
  const [page, setPage] = useState(0);
  const closeModal = () => {
    setDeletingBuyer(null);
  };

  const {
    data: buyers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://icebox-server.vercel.app/users/buyer"
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

  const handleDeleteBuyer = (buyer) => {

    fetch(`https://icebox-server.vercel.app/users/${buyer._id}`, {
      method: "DELETE",
      // ,
      // headers: {
      //     authorization: `bearer ${localStorage.getItem('accessToken')}`
      // }
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Buyer ${buyer.name} deleted successfully`);
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  const buyersProduct = buyers?.filter((buyer) => {
    const matchesSearch = buyer?.name
      ?.toLowerCase()
      .includes(searchQueryForBuyer.toLowerCase());

    return matchesSearch;
  });

  localStorage.setItem("totalBuyers", buyers?.length);
  return (
    <div className="px-10 mt-[90px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {" "}
          <h3 className="text-xl mb-5">All buyer:</h3>
          <div className="relative flex items-center h-9 mr-2 bg-white overflow-hidden border border-[#0047af]">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <IoMdSearch className="text-[#0047af] font-medium text-xl" />
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-[#0047af] pr-2"
              type="text"
              id="search"
              onChange={(e) => {
                setSearchQueryForBuyer(e.target.value);
                setPage(0);
              }}
              placeholder="Search buyer..."
            />
          </div>
        </div>
        <Pagination
          length={buyersProduct?.length}
          page={page}
          setPage={setPage}
        />
      </div>
      <div className="overflow-x-auto mt-3 grid grid-cols-3 gap-6 px-5 pb-5 ">
        {buyersProduct?.slice(6 * page, 6 * (page + 1)).map((buyer, i) => (
          <div
            key={i}
            className="mt-5 py-5 px-4 group hover:bg-[#0046ac] hover:text-white hover:bg-opacity-70"
            style={{ boxShadow: "rgb(119 119 119 / 19%) 0px 5px 15px" }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex justify-start items-center gap-3">
                <FiUsers />
                <p className="font-semibold text-[16px]">
                  {buyer.name.charAt(0).toUpperCase() + buyer.name.slice(1)}
                </p>
              </div>{" "}
              <div className="flex justify-center items-center">
                <label
                  onClick={() => setDeletingBuyer(buyer)}
                  htmlFor="confirmation-modal"
                  className="text-red-500 cursor-pointer group-hover:text-white"
                >
                  <MdDeleteOutline />
                </label>
              </div>
            </div>
            <div className="flex gap-2 items-center mt-1">
              {" "}
              <MdOutlineEmail />
              <p className="ml-1 text-[14.5px]"> {buyer.email}</p>
            </div>
          </div>
        ))}
      </div>
      {deletingBuyer && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingBuyer.name}. It cannot be undone.`}
          successAction={handleDeleteBuyer}
          successButtonName="Delete"
          modalData={deletingBuyer}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default AllBuyers;
