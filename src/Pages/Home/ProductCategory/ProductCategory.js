import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';

const ProductCategory = () => {
    const [productCategories, setProductCategories] = useState([]);
    useEffect(() => {
        fetch('Product.json')
            .then(res => res.json())
            .then(data => setProductCategories(data))
    }, []);

    return (
        <div>
            <div className='text-center mt-20'>
                <p className="text-2xl font-bold">Categories</p>
                <p className='mb-10'>Here show some category that you can select one easily</p>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center'>
                {
                    productCategories.map(categories => <CategoryCard
                        key={categories._id}
                        categories={categories}
                    ></CategoryCard>)
                }
            </div>
        
        </div>
    );
};

export default ProductCategory;