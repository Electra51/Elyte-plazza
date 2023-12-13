import React, { useContext } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useBuyer from "../hooks/useBuyer";
import useSeller from "../hooks/useSeller";
import DashBoardNavbar from "../Pages/Shared/DashBoardNavbar";
import { TbLayoutDashboard } from "react-icons/tb";
import { CiShoppingTag } from "react-icons/ci";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import {
  MdArrowBack,
  MdOutlineReportProblem,
  MdPostAdd,
  MdPreview,
} from "react-icons/md";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <div className="h-[100vh]">
      <DashBoardNavbar />
      {/* <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side z-[-1]">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content bg-gray-200">
            <li>
              <button className="btn btn-warning">
                <Link to="/dashboard/MyOrders" className="text-black">
                  My Orders
                </Link>
              </button>
            </li>

            {isAdmin && (
              <>
                <li>
                  <button className="btn btn-warning mt-2 text-black">
                    <Link to="/dashboard/allBuyers">All Buyers</Link>
                  </button>
                </li>
                <li>
                  <button className="btn btn-warning my-2 text-black">
                    <Link to="/dashboard/allSellers">All Sellers</Link>
                  </button>
                </li>
                <li>
                  <button className="btn btn-warning text-black">
                    <Link to="/dashboard/reportItem">Reported Item</Link>
                  </button>
                </li>
              </>
            )}

            {isSeller && (
              <>
                <li>
                  <button className="btn btn-warning my-2 text-black">
                    <Link to="/dashboard/myProducts">My Products</Link>
                  </button>
                </li>
                <li>
                  <button className="btn btn-warning text-black">
                    <Link to="/dashboard/addAProduct">Add A Product</Link>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div> */}

      <div className="w-full flex h-[100vh]">
        <div
          className="w-[15%] bg-[#0047af]"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <ul className="pt-4 mx-3 text-base-content mt-16">
            <NavLink
              to="/dashboard/dashboard"
              className="text-white w-full mt-1 p-2 px-3 flex justify-start items-center gap-2  pl-5"
            >
              <TbLayoutDashboard className="text-[18px] font-medium" />
              DashBoard
            </NavLink>
            {!isAdmin && (
              <>
                <NavLink
                  to="/dashboard/MyOrders"
                  className="text-white w-full p-2 px-3 flex justify-start items-center gap-2 pl-5"
                >
                  <CiShoppingTag className="text-[18px]" /> Orders
                </NavLink>
                <NavLink
                  to="/dashboard/wishlist"
                  className="w-full p-2 px-3 flex justify-start items-center gap-2 text-white pl-5"
                >
                  <AiOutlineHeart className="text-[18px]" />
                  WishList
                </NavLink>
                <NavLink
                  to="/dashboard/payment"
                  className="w-full p-2 px-3 flex justify-start items-center gap-2 text-white pl-5"
                >
                  <FaDollarSign className="text-[18px]" />
                  Payment
                </NavLink>
              </>
            )}

            {isAdmin && (
              <>
                {/* <li>
                  <button className="btn btn-warning mt-2 text-black">
                    <Link to="/dashboard/allBuyers">All Buyers</Link>
                  </button>
                </li> */}
                <NavLink
                  to="/dashboard/allBuyers"
                  className="text-white w-full mt-1 p-2 px-3 flex justify-start items-center gap-2  pl-5"
                >
                  <FiUsers className="text-[18px] font-medium" /> All Buyers
                </NavLink>
                <NavLink
                  to="/dashboard/allSellers"
                  className="text-white w-full mt-1 p-2 px-3 flex justify-start items-center gap-2  pl-5"
                >
                  <FaUserPlus className="text-[18px] font-medium" /> All Sellers
                </NavLink>
                <NavLink
                  to="/dashboard/reportItem"
                  className="text-white w-full mt-1 p-2 px-3 flex justify-start items-center gap-2  pl-5"
                >
                  <MdOutlineReportProblem className="text-[18px] font-medium" />{" "}
                  Reported Item
                </NavLink>
              </>
            )}
            {isSeller && (
              <>
                <NavLink
                  to="/dashboard/myProducts"
                  className="text-white w-full mt-1 p-2 px-3 flex justify-start items-center gap-2  pl-5"
                >
                  <MdPreview className="text-[18px] font-medium" /> My Products
                </NavLink>
                {/* <li>
                  <button className="btn btn-warning my-2 text-black">
                    <Link to="/dashboard/myProducts">My Products</Link>
                  </button>
                </li> */}
                <NavLink
                  to="/dashboard/addAProduct"
                  className="text-white w-full mt-1 p-2 px-3 flex justify-start items-center gap-2  pl-5"
                >
                  <MdPostAdd className="text-[18px] font-medium" /> Add A
                  Product
                </NavLink>
              </>
            )}

            <NavLink
              to="/dashboard/profile"
              className="text-white w-full p-2 px-3 flex justify-start items-center gap-2 pl-5"
            >
              <FaRegUserCircle className="text-[18px]" />
              Profile
            </NavLink>

            <NavLink
              to="/login"
              className="text-white border-b-2 border-[#a6a6dd78] p-2 px-3 flex justify-start items-center gap-2 pl-5 pb-3"
              onClick={handleLogOut}
            >
              <RiLogoutCircleRLine className="text-[18px]" />
              LogOut{" "}
            </NavLink>
            <NavLink
              to="/"
              className="text-white p-2 px-3 flex justify-start items-center gap-2 pl-5"
            >
              <MdArrowBack className="text-[18px]" />
              Back to Home
            </NavLink>
          </ul>
        </div>{" "}
        <div className="w-[85%]">
          {" "}
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
