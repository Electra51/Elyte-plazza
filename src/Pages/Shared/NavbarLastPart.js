import { useQuery } from "@tanstack/react-query";
import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const NavbarLastPart = () => {
  const { data: productCategories = [] } = useQuery({
    queryKey: ["productCategories"],
    queryFn: async () => {
      const res = await fetch("https://icebox-server.vercel.app/categories");
      const data = await res.json();
      return data;
    },
  });

  // console.log("productCategories", productCategories);
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

  return (
    <div className="navbar hidden lg:flex bg-[#146CDA] text-white p-0">
      <ul>
        <Link to="/category">
          <button className="mx-5">All</button>
        </Link>
        {productCategories?.map((e, i) => (
          <div className="dropdown ml-5" key={i}>
            <button className="dropbtn flex items-center">
              {e?.subCategory ? (
                <>
                  {e.name} <RiArrowDropDownLine className="text-2xl" />
                </>
              ) : (
                <Link to={`/category/${e.category_id}`}> {e.name}</Link>
              )}
            </button>
            {e?.subCategory ? (
              <div
                id="myDropdown"
                onClick={myFunction}
                className="p-2 shadow menu dropdown-content z-[1] bg-[#146CDA] w-52"
              >
                {e?.subCategory?.map((a, index) => (
                  <li key={index}>
                    <Link to={`/category/${e.category_id}`}> {a.subName}</Link>{" "}
                    {/* <a>{a.subName}</a> */}
                  </li>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default NavbarLastPart;
