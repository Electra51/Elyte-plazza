import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Link } from "react-router-dom";

const CategoryCard = ({ categories }) => {
  const { name, img, category_id } = categories;
  return (
    <div className="flex flex-col items-center justify-items-center justify-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 ml-3 p-5">
      <div className="avatar">
        <div className="w-16 rounded">
          <img src={img} />
        </div>
      </div>

      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-[16px] font-bold text-black">{name}</h5>
        <Link to={`/category/${category_id}`}>
          <button className="text-white px-3 py-1 text-[14px] rounded-md bg-[#156CDA]">
            View All Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
