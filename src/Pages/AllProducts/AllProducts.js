import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SingleProduct from './SingleProduct';

const AllProducts = () => {
    const products = useLoaderData();
    console.log(products);
    
    
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 my-10'>
            
            {
                products.map(product => <SingleProduct
                   key={product._id}
                    oneProduct={product}
                ></SingleProduct>)
           }
        </div>
    );
};

export default AllProducts;