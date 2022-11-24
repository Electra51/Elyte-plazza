import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from 'react-router-dom';

const CategoryCard = ({categories}) => {
    
        const {title, img,total_product, _id} = categories;
        return (
            <PhotoProvider>
            <div className="card card-compact w-80 bg-base-100 shadow-xl">
                    <figure>
                    <PhotoView src={img}>
                            <img src={img} alt="Shoes" />
                        </PhotoView></figure>
            <div className="card-body flex-grow-0 text-center">
                          <h2 className="text-center font-bold text-warning text-xl">{title }</h2>
                          <p className=' font-semibold'>Total Item :{total_product}</p>
                          <div className='flex align-middle justify-items-center'>
                         </div>
                          
                         <div className="card-actions justify-center">
                    <Link to={`/category/${_id}`}><button className="btn btn-warning">View All Product</button></Link>
          
          </div>
            </div>
                </div>
                </PhotoProvider>
        );
 
};

export default CategoryCard;