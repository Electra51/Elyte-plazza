import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ConfirmationModal from "../Shared/ConfirmationModal";
import Loading from "../Shared/Loading";
import { IoMdSearch } from "react-icons/io";
import { AuthContext } from "../../contexts/AuthProvider";
import { MdDeleteOutline } from "react-icons/md";
import Pagination from "../Shared/Pagination";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [deletingProduct, setDeletingProduct] = useState([null]);
  const navigate = useNavigate();
  const [searchQuerysellerProduct, setSearchQueryForSellerProduct] =
    useState("");
  const closeModal = () => {
    setDeletingProduct(null);
  };
  const [page, setPage] = useState(0);
  const {
    data: addProducts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["addProducts"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://icebox-server-9upx1roo2-electra51.vercel.app/products",
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });

  const AddProductsForUser = addProducts?.filter((newAdd) => {
    const matchesSearch =
      newAdd?.arrival == "new" && newAdd?.seller_email == user?.email;

    return matchesSearch;
  });

  localStorage.setItem("AddProductsForUser", AddProductsForUser?.length);

  const FilterAddProduct = AddProductsForUser?.filter((filterProduct) => {
    const matchesSearch = filterProduct?.item_name
      ?.toLowerCase()
      .includes(searchQuerysellerProduct.toLowerCase());

    return matchesSearch;
  });

  //handleMakeAvailable
  const handleMakeAvailable = (id) => {
    fetch(
      `https://icebox-server-9upx1roo2-electra51.vercel.app/addProducts/available/${id}`,
      {
        method: "PUT",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make available.");
          refetch();
          navigate("/Available");
        }
      });
  };

  //for delete

  const handleDeleteProduct = (product) => {
    fetch(
      `https://icebox-server-9upx1roo2-electra51.vercel.app/addProducts/${product._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`product ${product.item_name} deleted successfully`);
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="px-10 mt-[90px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {" "}
          <h3 className="text-xl mb-5">My Products:</h3>
          <div className="relative flex items-center h-9 mr-2 bg-white overflow-hidden border border-[#0047af]">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <IoMdSearch className="text-[#0047af] font-medium text-xl" />
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-[#0047af] pr-2"
              type="text"
              id="search"
              onChange={(e) => {
                setSearchQueryForSellerProduct(e.target.value);
                setPage(0);
              }}
              placeholder="Search buyer..."
            />
          </div>
        </div>
        <Pagination
          length={FilterAddProduct?.length}
          page={page}
          setPage={setPage}
        />
      </div>

      {FilterAddProduct.length > 0 ? (
        <div>
          {FilterAddProduct?.map((e, i) => {
            return (
              <div
                key={i}
                className="grid grid-cols-7 justify-start items-center gap-2 mt-5"
                style={{ boxShadow: "rgb(119 119 119 / 19%) 0px 5px 15px" }}>
                <div className="flex justify-start items-center col-span-3">
                  <img src={e?.item_img} alt="" width={150} />
                  <div className="flex flex-col justify-start items-start gap-1">
                    <p className="font-semibold text-[17px]">{e?.item_name}</p>
                    <p className="text-[16px] font-medium">
                      Year of Use: {e?.year_of_use}
                    </p>
                  </div>
                </div>
                <div className="text-[16px] font-medium flex flex-col justify-center items-center gap-1">
                  {" "}
                  <p>Original Price: ${e?.original_price}</p>
                  <p>Resale Price: ${e?.resale_price}</p>
                </div>
                <div className="col-span-2 text-[16px] font-medium flex flex-col justify-center items-center gap-1">
                  <p>
                    Category Name:{" "}
                    {e.category_id == 1
                      ? "Televisions (TV)"
                      : e.category_id == 2
                      ? "Refrigerators & Freezers"
                      : e.category_id == 3
                      ? "Washing Machines"
                      : e.category_id == 4
                      ? "Microwave & Electric Oven"
                      : e.category_id == 5
                      ? "Air Conditioner"
                      : e.category_id == 6
                      ? "Room Heaters"
                      : e.category_id == 7
                      ? "Blender & Mixer Grinder"
                      : ""}
                  </p>
                  <p>Brand: {e?.brand}</p>
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                  {" "}
                  <label
                    onClick={() => setDeletingProduct(e)}
                    htmlFor="confirmation-modal"
                    className="text-red-500 border border-red-500 rounded-[4px] px-3 cursor-pointer group-hover:text-white flex items-center gap-1">
                    Delete <MdDeleteOutline />
                  </label>
                  {e?.role !== "available" && (
                    <button
                      onClick={() => handleMakeAvailable(e._id)}
                      className="bg-[#0047AF] px-3 py-1 rounded-[4px] text-white">
                      Make Advertise
                    </button>
                  )}
                  {e?.role === "available" && (
                    <button
                      onClick={() => handleMakeAvailable(e._id)}
                      className="text-green-500 font-semibold">
                      Advertised
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-red-500 text-xl flex flex-col justify-center items-center my-20  gap-4">
          No products found.
        </p>
      )}

      {/* <div
        className="overflow-x-auto"
        data-aos="zoom-in-up"
        data-aos-duration="3000"
      >
        <table className="table w-full">
          <thead>
            <tr className="text-black">
              <th></th>
              <th>Image</th>
              <th>name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {addProducts?.length &&
              addProducts?.map((addProduct, i) => (
                <tr key={addProduct._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={addProduct.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{addProduct.name}</td>
                  <td>{addProduct.price}</td>
                  <td>
                    {addProduct?.role !== "available" && (
                      <button
                        onClick={() => handleMakeAvailable(addProduct._id)}
                        className="btn btn-warning btn-sm"
                      >
                        Make Advertise
                      </button>
                    )}
                    {addProduct?.role === "available" && (
                      <button
                        onClick={() => handleMakeAvailable(addProduct._id)}
                        className="text-green-500 font-semibold"
                      >
                        Advertised
                      </button>
                    )}
                  </td>
                  <td>
                    <label
                      onClick={() => setDeletingProduct(addProduct)}
                      htmlFor="confirmation-modal"
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div> */}
      {deletingProduct && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingProduct.item_name}. It cannot be undone.`}
          successAction={handleDeleteProduct}
          successButtonName="Delete"
          modalData={deletingProduct}
          closeModal={closeModal}></ConfirmationModal>
      )}
    </div>
  );
};

export default MyProducts;
