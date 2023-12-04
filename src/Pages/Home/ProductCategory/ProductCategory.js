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
      const res = await fetch("https://icebox-server.vercel.app/categories");
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
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="2200"
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mt-32">
        <p className="text-2xl font-bold" id="categories">
          CATEGORIES
        </p>
        <p className="mb-20">
          Here show some category that you can select one easily
        </p>
      </div>
      {/* <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center'>
                {
                    productCategories.map(categories => <CategoryCard
                        key={categories._id}
                        categories={categories}
                    ></CategoryCard>)
                }

            </div> */}

      <Slider {...settings}>
        {productCategories.map((categories, i) => (
          <CategoryCard
            key={categories._id}
            categories={categories}
          ></CategoryCard>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCategory;
