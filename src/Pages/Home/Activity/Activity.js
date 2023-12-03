import React from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { RiRefund2Fill } from "react-icons/ri";
import { RiWechatLine } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
const Activity = () => {
  return (
    <div className="grid grid-cols-4 bg-gray-100 text-[#0246B0]">
      <div className="flex justify-center items-center gap-3 py-7 px-3">
        <div className="flex justify-center items-center h-10 w-10 border border-[#0246B0] rounded-full">
          <MdOutlineLocalShipping className="text-xl" />
        </div>
        <div>
          <p className="font-semibold">Free Shipping</p>
          <p className="text-[14px]">Free Shipping for orders over $120</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 py-7 px-3">
        <div className="flex justify-center items-center h-10 w-10 border border-[#0246B0] rounded-full">
          <RiRefund2Fill className="text-xl" />
        </div>
        <div>
          <p className="font-semibold">Refund</p>
          <p className="text-[14px]">Within 30 days for an exchange.</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 py-7 px-3">
        <div className="flex justify-center items-center gap-3 h-10 w-10 border border-[#0246B0] rounded-full">
          <RiWechatLine className="text-xl" />
        </div>
        <div>
          <p className="font-semibold">Support</p>
          <p className="text-[14px]">24 hours a day, 7 days a week</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 py-7 px-3">
        <div className="flex justify-center items-center h-10 w-10 border border-[#0246B0] rounded-full">
          <MdPayment className="text-xl" />
        </div>
        <div>
          <p className="font-semibold">Payment</p>
          <p className="text-[14px]">Pay with Multiple Credit Cards</p>
        </div>
      </div>
    </div>
  );
};

export default Activity;
