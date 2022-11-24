import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from 'react-router-dom';

const CategoryCard = ({categories}) => {
    
        const {title, img,total_product } = categories;
        return (
            <PhotoProvider>
            <div className="card card-compact w-80 bg-base-100 shadow-xl">
                    <figure>
                    <PhotoView src={img}>
                            <img src={img} alt="Shoes" />
                        </PhotoView></figure>
            <div className="card-body flex-grow-0 text-center">
                          <h2 className="text-center">{title }</h2>
                          <p className='text-xl font-semibold text-orange-600'>total_product :{total_product}</p>
                          <div className='flex align-middle justify-items-center'>
                         </div>
                          
                         <div className="card-actions justify-center">
                    <Link to='{`/services/${_id}`}'><button className="btn btn-accent">View Detail</button></Link>
          
          </div>
            </div>
                </div>
                </PhotoProvider>
        );
 
};

export default CategoryCard;