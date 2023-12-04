import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaRegUserCircle, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import NavbarFirstPart from "./NavbarFirstPart";
import NavbarLastPart from "./NavbarLastPart";
import { RiLogoutCircleRLine } from "react-icons/ri";
import WishContext from "../../contexts/WishContext";

const Navbar = () => {
  const [fix, setFix] = useState(false);
  function setFixed() {
    if (window.scrollY >= 392) {
      setFix(true);
    } else {
      setFix(false);
    }
  }
  window.addEventListener("scroll", setFixed);
  //dark light toggle
  const [dark, setDark] = useState(false);

  const handleDark = () => {
    setDark(!dark);
    localStorage.setItem("dark-mode", !dark);
  };
  useEffect(() => {
    const localDark = JSON.parse(localStorage.getItem("dark-mode"));
    // console.log(localDark);
    setDark(localDark);
  }, []);
  useEffect(() => {
    if (dark) {
      document.querySelector("html").setAttribute("data-theme", "dark");
    } else {
      document
        .querySelector("html")
        .setAttribute("data-theme", "pickColorTheme");
    }
  }, [dark]);
  const { cart } = useContext(WishContext);
  const cartItems = cart?.cartItems;
  console.log("cartItems", cart);
  //authcontext theke user k nilm
  const { user, logOut } = useContext(AuthContext);

  //redirect
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
    navigate(from, { replace: true });
  };

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };
  const menuItems = (
    <React.Fragment>
      <Link to="/wishlist">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <AiOutlineHeart
              className={fix ? "text-white text-xl font-semibold" : "text-xl"}
            />
            {cartItems?.length > 0 && (
              <span
                className={
                  fix
                    ? "badge badge-sm indicator-item bg-white text-blue-500 dark:text-gray-300 border-0"
                    : "badge badge-sm indicator-item bg-blue-500 text-white dark:text-gray-300 border-0"
                }
              >
                {cartItems?.length}
              </span>
            )}
          </div>
        </button>
      </Link>

      <label className="swap swap-rotate ml-2">
        <input type="checkbox" onClick={handleDark} />

        <svg
          className="swap-on fill-current w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        <svg
          className="swap-off fill-current w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>
      <li>
        <button className="bg-transparent rounded-none font-medium">
          <Link to="/">Home</Link>
        </button>
      </li>
      <li>
        <button className="bg-transparent rounded-none !pl-0 font-medium">
          <Link to="/blogs">Blogs</Link>
        </button>
      </li>
      {user?.uid ? (
        <>
          {/* <button className="btn btn-outline mr-2">
            {" "}
            <Link className="ml-2 pr-3" to="/profile">
              {user?.photoURL ? (
                <img
                  title={user.displayName}
                  style={{ height: "35px" }}
                  alt=""
                  roundedCircle
                  src={user?.photoURL}
                ></img>
              ) : (
                <FaUser></FaUser>
              )}
            </Link>
            {user?.displayName}
          </button> */}

          <ul>
            <div className="dropdown mt-4">
              <button className="dropbtn flex justify-center items-center mr-2">
                {" "}
                {/* <Link className="ml-2 pr-3" to="/profile"> */}
                {user?.photoURL ? (
                  <img
                    title={`Click & view option`}
                    style={{ height: "35px" }}
                    alt=""
                    roundedcircle="true"
                    src={user?.photoURL}
                  ></img>
                ) : (
                  <FaUser></FaUser>
                )}
                {/* </Link> */}
                {/* {user?.displayName} */}
              </button>
              <div
                onClick={myFunction}
                id="myDropdown"
                className="p-4 mx-3 shadow rounded-[4px] menu dropdown-content !right-0 z-[1] w-52 bg-white"
                style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              >
                <Link to="/dashboard/profile">
                  <div className="hover:bg-[#146CDA] border-b hover:text-white rounded-[4px] flex justify-center items-center gap-2 py-2 cursor-pointer">
                    <FaRegUserCircle className="text-[18px] font-medium" /> My
                    Profile
                  </div>
                </Link>
                <Link to="/dashboard/dashboard">
                  <div className="mt-2 hover:bg-[#146CDA] border-b hover:text-white rounded-[4px] flex justify-center items-center gap-2 py-2 cursor-pointer">
                    {" "}
                    <TbLayoutDashboard className="text-[18px] font-medium" />
                    Dashboard
                  </div>
                </Link>

                <button
                  onClick={handleLogOut}
                  className="mt-2 hover:bg-[#146CDA] border-b hover:text-white rounded-[4px] flex justify-center items-center gap-2 py-2 cursor-pointer"
                >
                  {" "}
                  <RiLogoutCircleRLine className="text-[18px] font-medium" />
                  LogOut{" "}
                </button>
              </div>
            </div>
          </ul>

          {/* <li>
            <button
              onClick={handleLogOut}
              className="border border-[#146CDA] text-[#146CDA] rounded-[4px]"
            >
              LogOut
            </button>
          </li> */}
        </>
      ) : (
        <li>
          <Link to="/login" className="bg-transparent rounded-none ">
            <AiOutlineUser className="bg-transparent rounded-none" />{" "}
            Login/Register
          </Link>
        </li>
      )}
    </React.Fragment>
  );

  return (
    <div className="">
      <NavbarFirstPart />
      <div
        className={
          fix
            ? "navbar bg-[#146CDA] text-white z-10 flex fixed top-0 w-full shadow-md justify-between p-0"
            : "navbar bg-base-100 flex justify-between p-0"
        }
      >
        <div className="navbar-start mx-5">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <Link
            to="/"
            className="normal-case text-[22px] font-black flex justify-center items-center"
          >
            <img
              src="https://i.ibb.co/Q8vpRcM/Capture-removebg-preview.png"
              alt="Capture-removebg-preview"
              width={30}
            />
            Elyte Plazza
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
        <label
          htmlFor="dashboard-drawer"
          tabIndex={2}
          className="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        {/* <div className="h-3 bg-red-600"></div> */}
      </div>
      <NavbarLastPart />
    </div>
  );
};

export default Navbar;
