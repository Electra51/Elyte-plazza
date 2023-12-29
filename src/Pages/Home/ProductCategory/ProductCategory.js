import { useQuery } from "@tanstack/react-query";
import React from "react";
import CategoryCard from "./CategoryCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const ProductCategory = () => {
  const { data: productCategories = [] } = useQuery({
    queryKey: ["productCategories"],
    queryFn: async () => {
      const res = await fetch(
        "https://icebox-server-9upx1roo2-electra51.vercel.app/categories"
      );
      const data = await res.json();
      return data;
    },
  });

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="2200"
      className="max-w-[340px] lg:max-w-6xl mx-auto">
      <div className="text-center mt-4 lg:mt-32">
        <p className="text-[18px] lg:text-2xl font-bold" id="categories">
          CATEGORIES
        </p>
        <p className="mb-8 lg:mb-20">
          Here show some category that you can select one easily
        </p>
      </div>
      <Slider {...settings}>
        {productCategories.map((categories, i) => (
          <CategoryCard
            key={categories._id}
            categories={categories}></CategoryCard>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCategory;
