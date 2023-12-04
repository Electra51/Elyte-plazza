import React from "react";
import UserDashboard from "./UserDashboard";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";
import AdminDashboard from "./AdminDashboard";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import SellerDashbord from "./SellerDashbord";

const DashBoard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);

  return (
    <div className="">
      {/* <h2 className="text-2xl text-center text-[#0047AF] my-20">
        WelCome to your Dashboard
      </h2> */}
      {isAdmin ? <AdminDashboard /> : isSeller ? <SellerDashbord /> : <UserDashboard />}
    </div>
  );
};

export default DashBoard;
