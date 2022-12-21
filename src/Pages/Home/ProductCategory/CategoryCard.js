import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from 'react-router-dom';

const CategoryCard = ({categories}) => {
    
        const {name, img, _id} = categories;
        return (
            <PhotoProvider>
           
                        
                        <div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 ">
                                <figure> <PhotoView src={img}>
                                <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={img} alt=""/>
                           
                        </PhotoView></figure>
   
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-xl font-bold text-black">{name}</h5>
        <Link to={`/category/${_id}`}><button className="btn btn-warning">View All Product</button></Link>
    </div>
</div>

                </PhotoProvider>
        );
 
};

export default CategoryCard;