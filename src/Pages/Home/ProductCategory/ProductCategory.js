import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CategoryCard from './CategoryCard';

const ProductCategory = () => {
   

    const { data: productCategories=[] } = useQuery({
        queryKey: ['productCategories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories')
            const data = await res.json();
            return data;
        }
            
    });
   

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