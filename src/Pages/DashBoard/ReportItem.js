import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../Shared/ConfirmationModal";
import Loading from "../Shared/Loading";
import { FaUserPlus } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineEmail } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import Pagination from "../Shared/Pagination";

const ReportItem = () => {
  const [deletingReportedItem, setDeletingReportedItem] = useState([null]);
  const navigate = useNavigate();
  const [searchQueryForReport, setSearchQueryForReport] = useState("");
  const [page, setPage] = useState(0);
  const closeModal = () => {
    setDeletingReportedItem(null);
  };

  const {
    data: reportedItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportedItems"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://icebox-server.vercel.app/products/report/report",
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) { }
    },
  });

  const handleDeleteReportedItem = (reportedItem) => {

    fetch(`https://icebox-server.vercel.app/products/${reportedItem._id}`, {
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
          toast.success(`${reportedItem.name} deleted successfully`);
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  const reportProduct = reportedItems?.filter((reportedItem) => {
    const matchesSearch = reportedItem?.item_name
      ?.toLowerCase()
      .includes(searchQueryForReport.toLowerCase());

    return matchesSearch;
  });

  localStorage.setItem("reportedItems", reportedItems?.length);
  return (
    <div className="px-10 mt-[90px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {" "}
          <h3 className="text-xl mb-5">Reported Item:</h3>
          <div className="relative flex items-center h-9 mr-2 bg-white overflow-hidden border border-[#0047af]">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <IoMdSearch className="text-[#0047af] font-medium text-xl" />
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-[#0047af] pr-2"
              type="text"
              id="search"
              onChange={(e) => {
                setSearchQueryForReport(e.target.value);
                setPage(0);
              }}
              placeholder="Search buyer..."
            />
          </div>
        </div>
        <Pagination
          length={reportProduct?.length}
          page={page}
          setPage={setPage}
        />
      </div>

      <div className="overflow-x-auto p-4">
        {reportProduct
          ?.slice(6 * page, 6 * (page + 1))
          .map((reportedItem, i) => {

            return (
              <div key={i}
                className="w-full flex items-center justify-between mt-4 border-b p-3"
                style={{ boxShadow: "rgb(119 119 119 / 19%) 0px 5px 15px" }}
              >
                <div className=" w-[42%] flex justify-start items-center gap-3">
                  {" "}
                  <img src={reportedItem?.item_img} alt="" width={100} />
                  <div>
                    {" "}
                    <p className="text-[16px] font-semibold">
                      {reportedItem?.item_name}
                    </p>
                    <p className="text-[15px]">Brand: {reportedItem?.brand}</p>
                  </div>
                </div>
                <div className="w-[22%]">
                  <p className="text-[15px]">
                    Resale Price: ${reportedItem?.resale_price}
                  </p>
                  <p className="text-[15px]">
                    Original Price: ${reportedItem?.original_price}
                  </p>
                </div>
                <div className="w-[22%]">
                  <p className="flex items-center justify-start gap-1 text-[15px]">
                    <FaUserPlus /> {reportedItem?.seller_name}
                  </p>
                  <p className="flex items-center justify-start gap-1 text-[15px]">
                    <MdOutlineEmail /> {reportedItem?.seller_email}
                  </p>
                </div>
                <div className="flex justify-center items-center w-[14%] ">
                  <label
                    onClick={() => setDeletingReportedItem(reportedItem)}
                    htmlFor="confirmation-modal"
                    className="text-red-500 cursor-pointer"
                  >
                    <MdDeleteOutline className="text-xl" />
                  </label>
                </div>
              </div>
            );
          })}

        {/* {reportedItems?.map((reportedItem, i) => (
              <tr key={reportedItem._id}>
                <th>{1 + i}</th>
                <td>{reportedItem.name}</td>
                <td>{reportedItem.resale_price}</td>
                <td>
                  <label
                    onClick={() => setDeletingReportedItem(reportedItem)}
                    htmlFor="confirmation-modal"
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))} */}
      </div>
      {deletingReportedItem && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingReportedItem.item_name}. It cannot be undone.`}
          successAction={handleDeleteReportedItem}
          successButtonName="Delete"
          modalData={deletingReportedItem}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default ReportItem;
