import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Link, useNavigation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Loading from "../Shared/Loading";
import Pagination from "../Shared/Pagination";
import { IoMdSearch } from "react-icons/io";

const MyOrders = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  // const url = `https://icebox-server-9upx1roo2-electra51.vercel.app/bookings?email=${user?.email}`;

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://icebox-server-9upx1roo2-electra51.vercel.app/bookings?email=${user?.email}`,
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
    // queryFn: async () => {
    //     const res = await fetch(url, {
    //         headers: {
    //             authorization: `bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     });
    //     const data = await res.json();
    //     return data;
    // }
  });
  refetch();
  if (isLoading) {
    return <Loading></Loading>;
  }

  if (navigation.state === "loading") {
    return <Loading></Loading>;
  }

  const bookingProduct = bookings
    ?.filter((product) => {
      // Filter by search query
      const matchesSearch = product?.itemName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .slice(6 * page, 6 * (page + 1));

  // color: #0047AF

  localStorage.setItem("bookings", bookings.length);

  return (
    <div className="px-10 mt-24">
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center">
          <div className="relative flex items-center h-9 mr-2 bg-white overflow-hidden border border-[#0047af]">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <IoMdSearch className="text-[#0047af] font-medium text-xl" />
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-[#0047af] pr-2"
              type="text"
              id="search"
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              placeholder="Search Service.."
            />
          </div>
          <Pagination
            length={bookingProduct?.length}
            page={page}
            setPage={setPage}
          />
        </div>

        {bookingProduct.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 mt-5">
            {bookingProduct.map((booking, i) => (
              <div
                className="grid grid-cols-3 mt-5 gap-5 border-b ml-4 hover:shadow-md hover:bg-[#0047af] px-5 py-5 hover:text-white  rounded-[4px]"
                key={i}>
                <div className="col-span-2 flex justify-start items-center gap-2">
                  <div>{i + 1}.</div>
                  <div className="avatar">
                    <div className="mask mask-squircle w-14 h-14">
                      <img
                        src={booking.imageUrl}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <p>{booking.itemName}</p>
                    <p>rating: 4*</p>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-3">
                  <div>Price: ${booking.price}</div>
                  <div>
                    {booking.price && !booking.paid && (
                      <Link to={`/dashboard/payment/${booking._id}`}>
                        <button className="bg-green-500 text-white rounded-sm btn-sm">
                          Pay
                        </button>
                      </Link>
                    )}
                    {booking.price && booking.paid && (
                      <span className="text-red-500 font-semibold">Paid</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-xl flex flex-col justify-center items-center my-20  gap-4">
            {/* <RxShadowNone /> */}
            No products found with the current filters and search criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
