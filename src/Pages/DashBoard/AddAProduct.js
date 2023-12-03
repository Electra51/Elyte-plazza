import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Loading from "../Shared/Loading";
import "./add.css";

const AddAProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { data: categoryNames, isLoading } = useQuery({
    queryKey: ["Category"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/categoriesName");
      const data = await res.json();
      return data;
    },
  });

  console.log("categoryNames", categoryNames);
  const handleAddProduct = (data) => {
    const product = {
      item_name: data.item_name,
      seller_name: data.seller_name,
      seller_email: data.seller_email,
      phone: data.phone,
      model: data.model,
      weight: data.weight,
      brand: data.brand,
      details: data.details,
      arrival: data.arrival,
      location: data.location,
      category_id: data.category_id,
      year_of_use: data.year_of_use,
      subNumber: data.subNumber,
      resale_price: data.resale_price,
      original_price: data.original_price,
      item_img: data.item_img,
    };

    console.log("product", product);
    fetch("http://localhost:5000/addProducts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        toast.success(`${data.name} is added successfully`);
        navigate("/dashboard/myProducts");
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="px-10 mt-[90px]">
      <h2 className="text-xl mb-2">Add A Product</h2>
      <hr className="mt-0 pb-5" />
      <form
        onSubmit={handleSubmit(handleAddProduct)}
        className="grid grid-cols-2 gap-10"
      >
        {" "}
        <div className="flex flex-col gap-2">
          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Product Name:</p>
              <input
                type="text"
                {...register("item_name", {
                  required: "Name is Required",
                })}
                className="input input-bordered w-full h-8 col-span-3"
              />
            </div>

            {errors.item_name && (
              <p className="text-red-500">{errors.item_name.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Product URL:</p>
              <input
                type="text"
                {...register("item_img", {
                  required: "Photo is Required",
                })}
                className="input h-8 w-full col-span-3"
              />
            </div>
            {errors.item_img && (
              <p className="text-red-500">{errors.item_img.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Original Price:</p>
              <input
                type="text"
                {...register("original_price", {
                  required: "original_price is Required",
                })}
                className="input input-bordered w-full h-8 col-span-3"
              />
            </div>

            {errors.original_price && (
              <p className="text-red-500">{errors.original_price.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Product Price:</p>
              <input
                type="text"
                {...register("resale_price", {
                  required: "resale_price is Required",
                })}
                className="input input-bordered w-full h-8 col-span-3"
              />
            </div>

            {errors.resale_price && (
              <p className="text-red-500">{errors.resale_price.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Model:</p>
              <input
                type="text"
                {...register("model", {
                  required: "model is Required",
                })}
                className="input input-bordered w-full h-8 col-span-3"
              />
            </div>

            {errors.model && (
              <p className="text-red-500">{errors.model.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Brand:</p>
              <input
                type="text"
                {...register("brand", {
                  required: "brand is Required",
                })}
                className="input input-bordered w-full h-8 col-span-3"
              />
            </div>

            {errors.brand && (
              <p className="text-red-500">{errors.brand.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Weight:</p>
              <input
                type="text"
                {...register("weight", {
                  required: "weight is Required",
                })}
                className="input input-bordered w-full h-8 col-span-3"
              />
            </div>

            {errors.weight && (
              <p className="text-red-500">{errors.weight.message}</p>
            )}
          </div>

          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Sub Category:</p>
              <select
                {...register("subNumber")}
                className="select input-bordered w-full"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
          <div className="flex justify-start items-start gap-2 mt-2">
            <p className="font-bold text-red-500">
              {" "}
              Note<sup className="text-red-500 font-bold">*</sup>:
            </p>{" "}
            <div>
              <p className="text-[12px] mt-1">
                Sub Category = 1; LED TV, Non-Frost Refrigerator, Microwave
                Oven, Split AC, Blender & Juicer.
              </p>
              <p className="text-[12px]">
                Sub Category = 2; Android TV, Beverage Cooler, Electric Oven,
                Ceilling AC, Mixer Grinder.
              </p>
              <p className="text-[12px]">Sub Category = 3; Freezer.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Seller:</p>
              <input
                type="text"
                {...register("seller_name", {
                  required: true,
                })}
                defaultValue={user?.displayName}
                className="input input-bordered w-full h-8 col-span-3"
                readOnly
              />
            </div>

            {errors.seller_name && (
              <p className="text-red-500">{errors.seller_name.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Email:</p>
              <input
                type="text"
                {...register("seller_email", {
                  required: true,
                })}
                defaultValue={user?.email}
                className="input w-full h-8 col-span-3"
                readOnly
              />
            </div>
            {errors.seller_email && (
              <p className="text-red-500">{errors.seller_email.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Arrival:</p>
              <input
                type="text"
                {...register("arrival", {
                  required: true,
                })}
                defaultValue="new"
                className="input w-full h-8 col-span-3"
                readOnly
              />
            </div>
          </div>
          <div className="form-control w-full ">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Phone:</p>
              <input
                type="text"
                {...register("phone", {
                  required: "phone is Required",
                })}
                className="input w-full h-8 col-span-3"
              />
            </div>

            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="form-control w-full ">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Location: </p>{" "}
              <input
                type="text"
                {...register("location", {
                  required: "location is Required",
                })}
                className="input w-full h-8 col-span-3"
              />
            </div>

            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </div>

          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Use year:</p>
              <input
                type="text"
                {...register("year_of_use", {
                  required: true,
                })}
                className="input h-8 w-full col-span-3"
              />
            </div>
            {errors.year_of_use && (
              <p className="text-red-500">{errors.year_of_use.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Product Details:</p>
              <textarea
                type="text"
                {...register("details", {
                  required: "details is Required",
                })}
                className="input input-bordered w-full col-span-3"
              />
            </div>

            {errors.details && (
              <p className="text-red-500">{errors.details.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <div className="grid grid-cols-4 justify-center items-center">
              <p>Category:</p>
              <select
                {...register("category_id")}
                className="select input-bordered w-full"
              >
                {categoryNames?.map((names, i) => {
                  console.log("names", names.category_id);
                  return (
                    <option key={i} value={names.category_id}>
                      {names.category_id == 1
                        ? "Televisions (TV)"
                        : names.category_id == 2
                        ? "Refrigerators & Freezers"
                        : names.category_id == 3
                        ? "Washing Machines"
                        : names.category_id == 4
                        ? "Microwave & Electric Oven"
                        : names.category_id == 5
                        ? "Air Conditioner"
                        : names.category_id == 6
                        ? "Room Heaters"
                        : names.category_id == 7
                        ? "Blender & Mixer Grinder"
                        : ""}
                    </option>
                  );
                })}
              </select>
            </div>

            {errors.category_id && (
              <p className="text-red-500">{errors.category_id.message}</p>
            )}
          </div>
        </div>
        <input
          className="bg-[#0047AF] px-3 py-1 rounded-[4px] text-white"
          value="Add Product"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddAProduct;
