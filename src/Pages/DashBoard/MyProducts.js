
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Shared/Loading';






const MyProducts = () => {
    const { data: addProducts, isLoading, refetch } = useQuery({
    queryKey: ['addProducts'],
    queryFn: async () => {
        try {
            const res = await fetch('http://localhost:5000/addProducts', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
        catch (error) {

        }
    }
    });
    
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            MyProducts{addProducts?.length}

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                  
        
     
      
    
 
                        {
                            addProducts?.length &&
                            addProducts?.map((addProduct, i) => <tr key={addProduct._id}>
                                <th>{i + 1}</th>
                                <td>
                                <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={addProduct.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
                                </td>
                                <td>{addProduct.name}</td>
                                <td>{addProduct.price}</td>
                               
                                <td>
                                    <button className='btn btn-outline btn-error btn-sm'>Available</button>
                                    
                                </td>
                                <td>
                                <button className='btn btn-outline btn-warning btn-sm'>Advertise</button>
                                   
                                </td>
                                <td>
                                <button className='btn btn-error btn-sm'>Delete</button>
                                </td>
                            </tr>)
                                    }
                                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;