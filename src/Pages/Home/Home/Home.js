import React from 'react';
import Banner from '../Banner/Banner';
import ProductCategory from '../ProductCategory/ProductCategory';
import Stat from '../Stat/Stat';


const Home = () => {
    return (
        <div>
        <Banner></Banner>,
            <ProductCategory></ProductCategory>
           <Stat></Stat>
        </div>
        
          
    );
};

export default Home;