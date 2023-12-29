import React, { useContext, useState } from "react";
import WishContext from "../../contexts/WishContext";
import { FcBusinessman } from "react-icons/fc";
import BookingModal from "../BookingModal/BookingModal";
import newImages from "../../assets/images/newImages1.png";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineReportProblem } from "react-icons/md";
const WishList = () => {
  const { cart, setCartToState } = useContext(WishContext);
  const [productModals, setProductModals] = useState(null);
  const navigate = useNavigate();
  const deleteItemFromCart = (id) => {
    console.log("id", id);
    const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);
    console.log("newCartItems", newCartItems);
    localStorage.setItem("wish", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };
  const handleMakeReport = (id) => {
    fetch(
      `https://icebox-server-9upx1roo2-electra51.vercel.app/products/report/${id}`,
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
          toast.success("Reported this item");
          // refetch()
          navigate("/dashboard/reportItem");
        }
      });
  };
  return (
    <div>
      <p className="font-semibold text-xl py-5  max-w-6xl mx-auto">
        My WishList
      </p>
      {cart?.cartItems?.length == 0 ? (
        <p className="text-center my-20">No wishlist product find...</p>
      ) : (
        <div className="grid grid-cols-4 max-w-6xl mx-auto gap-7 pb-12 pt-6">
          {cart.cartItems?.map((e, i) => {
            return (
              <div
                className="h-[390px] bg-gray-200 shadow-xl relative rounded-[4px]"
                key={i}>
                <figure className="p-3 pt-10 h-40">
                  <img
                    src={e.item_img}
                    alt="Shoes"
                    className="rounded-xl h-full w-full object-contain"
                  />
                </figure>
                <div className="absolute top-[-2.5px] left-[-2.5px]">
                  {e?.role == "available" && (
                    <img src={newImages} alt="" width={50} />
                  )}
                </div>{" "}
                <div className="absolute top-2 right-2">
                  {" "}
                  {e?.type !== "report" && (
                    <Link
                      onClick={() => handleMakeReport(e.product)}
                      className="underline text-primary text-[14px] flex justify-center items-center gap-1">
                      <MdOutlineReportProblem />
                    </Link>
                  )}
                  {e?.type === "report" && (
                    <Link className="underline text-red-500 font-medium ml-5">
                      Reported
                    </Link>
                  )}
                </div>
                <div className="pt-6 h-40 px-5 items-center text-center text-black">
                  <h2 className="text-[16px] font-bold text-start">
                    {e.item_name}
                  </h2>
                  <p className="text-[15px] line-through text-start">
                    Original Price:{" "}
                    <span className="line-through">${e.original_price}</span>
                  </p>
                  <p className="text-[15px] text-start">
                    Resale Price: <span className="">${e.resale_price}</span>
                  </p>
                  <div className="flex justify-between item-center text-[15px] mt-1">
                    <div className="flex justify-center items-center gap-1">
                      <FcBusinessman />
                      {e.seller_name}
                    </div>
                    <p>Use: {e.year_of_use} year</p>
                  </div>

                  <div className="py-6">
                    <label
                      onClick={() => setProductModals(e)}
                      htmlFor="booking-modal"
                      className="text-white px-16 py-2 text-[14px] rounded-md bg-[#156CDA] w-full cursor-pointer">
                      Book Now
                    </label>
                    <p
                      className="text-[12px] py-2 underline hover:text-blue-500 cursor-pointer"
                      onClick={() => deleteItemFromCart(e.product)}>
                      Remove From Wishlist
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {productModals && (
        <BookingModal
          productModals={productModals}
          setProductModals={setProductModals}></BookingModal>
      )}
    </div>
  );
};

export default WishList;
