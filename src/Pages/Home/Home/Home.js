import React from "react";
import Available from "../Available";
import ProductCategory from "../ProductCategory/ProductCategory";
import Stat from "../Stat/Stat";
import Banner from "../Banner/Banner";
import Activity from "../Activity/Activity";

const Home = () => {
  return (
    <div>
      <Banner />
      <ProductCategory></ProductCategory>
      <Stat></Stat>
      <Available></Available>
      <Activity />
    </div>
  );
};

export default Home;
