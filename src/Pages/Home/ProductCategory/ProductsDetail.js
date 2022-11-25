import React, { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Link } from 'react-router-dom';

const ProductsDetail = () => {
    const [itemCategories, setItemCategories] = useState([]);
    useEffect(() => {
        fetch('Category.json')
            .then(res => res.json())
            .then(data => setItemCategories(data))
    }, []);
    return (
        <div>
            {
                itemCategories.map(item =>
                    <div className="card card-compact w-80 bg-base-100 shadow-xl" key={item._id} >
                <figure>
                <PhotoView src={item.item_img}>
                        <img src="{img}" alt="Shoes" />
                    </PhotoView></figure>
        <div className="card-body flex-grow-0 text-center">
                            <h2 className="text-center">{item.name}</h2>
                      <p className='text-xl font-semibold text-orange-600'>total_product :</p>
                      <div className='flex align-middle justify-items-center'>
                     </div>
                      
                     <div className="card-actions justify-center">
                <Link to={`/category/${item._id}`}><button className="btn btn-accent">View All Product</button></Link>
      
      </div>
        </div>
            </div>
)
                }
            
        </div>
    );
};

export default ProductsDetail;