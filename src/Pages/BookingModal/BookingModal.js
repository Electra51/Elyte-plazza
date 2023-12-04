import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";
import "./new.css";
import { FcBusinessman } from "react-icons/fc";

import { MdOutlineEmail } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { MdPhoneInTalk } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
const BookingModal = ({ productModals, setProductModals }) => {
  const { item_name, item_img, seller_name, resale_price, year_of_use } =
    productModals;
  const { user } = useContext(AuthContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const location = form.location.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const booking = {
      itemName: item_name,
      seller_name: seller_name,
      Username: name,
      imageUrl: item_img,
      price: resale_price,
      email,
      phone,
      location,
    };

    fetch("https://icebox-server.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.acknowledged) {
          setProductModals(null);
          toast.success("the item is booked");
        }
      });


  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal rounded-[4px]">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{item_name}</h3>
          <div className="relative">
            {" "}
            <div className=" mt-1">
              <p className="flex justify-start items-center gap-1 text-[14px]">
                {" "}
                <FcBusinessman />
                Seller Name: {seller_name}
              </p>
              <p className="text-[14px]">Use: {year_of_use} year</p>
              <p className=" text-[#146cda]">Price: ${resale_price}</p>
            </div>
            <img
              src={item_img}
              alt=""
              width={100}
              className="absolute right-2 top-2"
            />
          </div>

          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10 mx-10"
          >
            {" "}
            <label>Booking Information:</label>
            <div className="flex justify-between  items-center gap-3">
              <div className="relative">
                <FaRegUserCircle className="absolute top-4 left-2 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  defaultValue={user?.displayName}
                  disabled
                  placeholder="Your Name"
                  className="input w-full input-bordered pl-8 text-[14px] font-normal"
                />
              </div>
              <div className="relative">
                {" "}
                <MdOutlineEmail className="absolute top-4 left-2 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  placeholder="Email Address"
                  className="input w-full input-bordered pl-8 text-[14px] font-normal"
                />
              </div>
            </div>
            <div className="relative">
              {" "}
              <MdPhoneInTalk className="absolute top-4 left-2 text-gray-400" />
              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                className="input w-full input-bordered pl-7"
              />
            </div>
            <div className="relative">
              {" "}
              <MdLocationOn className="absolute top-4 left-2 text-gray-400" />
              <input
                name="location"
                type="text"
                placeholder="Location"
                className="input w-full input-bordered pl-7"
              />
            </div>
            <br />
            <input
              className="bg-[#0047AF] py-2 text-white rounded-[4px] w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
