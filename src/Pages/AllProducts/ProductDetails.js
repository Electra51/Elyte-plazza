import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import BookingModal from "../BookingModal/BookingModal";
import LoaderModal from "../Shared/LoaderModal";
import WishContext from "../../contexts/WishContext";
import { FaRegHeart } from "react-icons/fa";

const ProductDetails = () => {
  const loaderData = useLoaderData();
  const details = loaderData;
  console.log("details", details);
  const { user } = useContext(AuthContext);
  const [productModals, setProductModals] = useState(null);
  const { addItemToCart, cart } = useContext(WishContext);

  const [isInWishlist, setIsInWishlist] = useState(false);
  useEffect(() => {
    const isInWishlistStored = localStorage.getItem(`wishlist_${details._id}`);
    setIsInWishlist(!!isInWishlistStored);
  }, [details._id]);
  const addToCardHandler = () => {
    console.log("first");
    addItemToCart({
      product: details._id,
      item_name: details.item_name,
      resale_price: details?.resale_price,
      item_img: details.item_img,
      original_price: details?.original_price,
      seller_name: details?.seller_name,
      year_of_use: details?.year_of_use,
    });
    setIsInWishlist(true);
    localStorage.setItem(`wishlist_${details._id}`, "true");
  };
  return (
    <div className="grid grid-cols-2 gap-12 justify-start items-start my-20 mx-auto max-w-6xl">
      <div>
        <img src={details.item_img} alt={details.item_name} />
      </div>
      <div className="text-black">
        <p className="text-[22px] font-bold tracking-[0.3px]">
          {details.item_name}
        </p>
        <button className="mt-0.5 text-[17px] bg-green-500 rounded-[4px] text-white px-2">
          {details.arrival}
        </button>
        <p className="mt-1 text-[17px] tracking-[0.3px]">
          <span className="font-semibold">Original Price: </span>$
          {details.original_price}
        </p>
        <p className="mt-0.5 text-[17px] tracking-[0.3px]">
          <span className="font-semibold">Resale Price: </span>
          {details.resale_price}
        </p>

        <p className="mt-2 text-[17px]  tracking-[0.3px]">
          <span className="font-semibold">Model: </span>
          {details.model}
        </p>

        <p className="mt-0.5 text-[17px]  tracking-[0.3px]">
          <span className="font-semibold">Weight: </span>
          {details.weight}
        </p>

        <p className="mt-0.5 text-[17px]  tracking-[0.3px]">
          <span className="font-semibold">Year of Use: </span>
          {details.year_of_use} year
        </p>
        <p className="mt-0.5 text-[17px] text-justify tracking-[0.3px]">
          <span className="font-semibold mr-1">Details :</span>
          {details.details}
        </p>

        <div className="mt-8 flex justify-start items-center gap-10">
          {user?.email ? (
            <div className="">
              <label
                onClick={() => setProductModals(details)}
                htmlFor="booking-modal"
                className="text-white px-4 py-2 text-[14px] rounded-md bg-[#156CDA] cursor-pointer"
              >
                Book Now
              </label>
            </div>
          ) : (
            <div className="">
              <label
                onClick={() => setProductModals(details)}
                htmlFor="loader-modal"
                className="text-white px-4 py-2 text-[14px] rounded-md bg-[#156CDA] cursor-pointer"
              >
                Book Now
              </label>
            </div>
          )}
          <div className="hover:bg-[#156CDA] border border-[#156CDA] h-8 w-8 rounded-full text-[#156CDA] flex justify-center items-center hover:text-white">
            <FaRegHeart
              onClick={addToCardHandler}
              style={{ color: isInWishlist ? "red" : "#156CDA" }}
            />
          </div>
        </div>
      </div>
      {productModals && (
        <BookingModal
          productModals={productModals}
          setProductModals={setProductModals}
        ></BookingModal>
      )}
      {productModals && (
        <LoaderModal
          productModals={productModals}
          setProductModals={setProductModals}
        ></LoaderModal>
      )}
    </div>
  );
};

export default ProductDetails;
