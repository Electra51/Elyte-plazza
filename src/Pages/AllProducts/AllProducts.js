import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../BookingModal/BookingModal';
import SingleProduct from './SingleProduct';

const AllProducts = () => {
    const products = useLoaderData();
    console.log(products);
    const [productModals, setProductModals] = useState(null);
    
    
    return (
        <div>
             <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 my-10'>
            
            {
                products.map(product => <SingleProduct
                   key={product._id}
                    oneProduct={product}
                    setProductModals={setProductModals}
                ></SingleProduct>)
           }
            </div>
            {
               productModals && <BookingModal
                    productModals={productModals}
                    setProductModals={setProductModals}></BookingModal>
            }
            
       </div>
    );
};

export default AllProducts;