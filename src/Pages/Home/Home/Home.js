import React from 'react';
import Available from '../Available';
import Banner from '../Banner/Banner';
import ProductCategory from '../ProductCategory/ProductCategory';
import Stat from '../Stat/Stat';


const Home = () => {
    return (
        <div>
        <Banner></Banner>
            <ProductCategory></ProductCategory>
            <Stat></Stat>
            <Available></Available>
           
        </div>
        
          
    );
};

export default Home;