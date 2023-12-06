import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import DotLoader from "react-spinners/DotLoader";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAdmin from "../../hooks/useAdmin";
import { MdOutlineReportProblem } from "react-icons/md";
import { FcBusinessman } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import WishContext from "../../contexts/WishContext";

const SingleProduct = ({ oneProduct, setProductModals }) => {
  console.log("oneProduct", oneProduct)
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  const { addItemToCart, cart } = useContext(WishContext);

  const [isInWishlist, setIsInWishlist] = useState(false);
  useEffect(() => {
    const isInWishlistStored = localStorage.getItem(`wishlist_${oneProduct._id}`);
    setIsInWishlist(!!isInWishlistStored);
  }, [oneProduct._id]);
  const addToCardHandler = () => {
    console.log("first")
    addItemToCart({
      product: oneProduct._id,
      item_name: oneProduct.item_name,
      resale_price: oneProduct?.resale_price,
      item_img: oneProduct.item_img,
      original_price: oneProduct?.original_price,
      seller_name: oneProduct?.seller_name,
      year_of_use: oneProduct?.year_of_use,
    });
    setIsInWishlist(true); localStorage.setItem(`wishlist_${oneProduct._id}`, "true");
  };
  const navigate = useNavigate();
  const { loading } = useContext(AuthContext);
  const { _id,
    item_img,
    item_name,
    location,
    original_price,
    resale_price,
    seller_name,
    year_of_use,
  } = oneProduct;

  if (loading) {
    return (
      <DotLoader
        color={"#E9C211"}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  const handleMakeReport = (id) => {
    fetch(`https://icebox-server.vercel.app/products/report/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
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
      {/* <div className="card w-96 bg-base-100 shadow-xl border">
                <figure className="px-10 pt-10">
                    <img src={item_img} alt="fridge" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{item_name}</h2>
                    <p className=''>original_price: {original_price}</p>
                    <p className=''>resale_price: {resale_price}</p>
                    <p className=''>seller_name: {seller_name}</p>
                    <p className=''>location: {location}</p>
                    <p className=''>year_of_use: {year_of_use}</p>
                    <div className='flex justify-between items-center'>
                    <div className="">
                        <label onClick={()=>setProductModals(oneProduct)}
                            htmlFor="booking-modal" className="btn btn-warning">Book Now</label>
                        
                        </div>
                        {
                                        oneProduct?.type !=='report' && <Link onClick={() => handleMakeReport(oneProduct._id)} className='underline ml-5 text-primary'>Report to Admin</Link>
                        }
                        {
                               
                                oneProduct?.type ==='report' && <Link className='underline text-red-700 font-bold ml-5'>Reported</Link>
                         
                        }
                        
                    </div>
                </div>
            </div> */}
      <div
        className="h-[390px] bg-gray-200 shadow-xl relative rounded-[4px]"
        key={item_img._id}
      >
        <figure className="p-3 pt-10 h-40">
          <img
            src={item_img}
            alt="Shoes"
            className="rounded-xl h-full w-full object-contain"
          />
        </figure>
        <div className="pt-6 h-40 px-5 items-center text-center text-black">
          <h2 className="text-[16px] font-bold text-start">{item_name}</h2>
          <p className="text-[15px] line-through text-start">
            Original Price:{" "}
            <span className="line-through">${original_price}</span>
          </p>
          <p className="text-[15px] text-start">
            Resale Price: <span className="">${resale_price}</span>
          </p>
          <div className="absolute top-2 left-3">
            {oneProduct?.role == "available" && (
              <button className="px-2 py-0.1 bg-green-500 text-white rounded-[4px] text-[14px]">New</button>
            )}
          </div>
          <div className="absolute top-2 right-2">
            <div className="flex justify-center items-center gap-1 px-2 rounded-[4px] text-white text-[14px]">
              {" "}
              <div>
                {" "}
                {oneProduct?.type !== "report" && (
                  <Link
                    onClick={() => handleMakeReport(oneProduct._id)}
                    className="underline text-primary text-[14px] flex justify-center items-center gap-1"
                  >
                    <MdOutlineReportProblem />
                  </Link>
                )}
                {oneProduct?.type === "report" && (
                  <Link className="underline text-red-500 font-medium ml-5">
                    Reported
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between item-center text-[15px] mt-1">
            <div className="flex justify-center items-center gap-1">
              <FcBusinessman />
              {seller_name}
            </div>
            <p>Use: {year_of_use} year</p>
          </div>

          <div className="mt-4 flex justify-between">
            {
              user?.email ? <div className="">
                <label
                  onClick={() => setProductModals(oneProduct)}
                  htmlFor="booking-modal"
                  className="text-white px-4 py-2 text-[14px] rounded-md bg-[#156CDA]"
                >
                  Book Now
                </label>
              </div> : <div className="">
                <label
                  onClick={() => setProductModals(oneProduct)}
                  htmlFor="loader-modal"
                  className="text-white px-4 py-2 text-[14px] rounded-md bg-[#156CDA]"
                >
                  Book Now
                </label>
              </div>
            }


            <div className="hover:bg-[#156CDA] border border-[#156CDA] h-8 w-8 rounded-full text-[#156CDA] flex justify-center items-center hover:text-white">

              <FaRegHeart
                onClick={addToCardHandler}
                style={{ color: isInWishlist ? "red" : "#156CDA" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
