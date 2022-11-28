import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Shared/ConfirmationModal';
import Loading from '../Shared/Loading';




const MyProducts = () => {
    const [deletingProduct, setDeletingProduct] = useState([null]);

    const navigate = useNavigate();

    const closeModal = () => {
        setDeletingProduct(null);
    }

    const { data: addProducts, isLoading, refetch } = useQuery({
        queryKey: ['addProducts'],
        queryFn: async () => {
            try {
                const res = await fetch('https://icebox-server.vercel.app/addProducts', {
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



//handleMakeAvailable
    const handleMakeAvailable = id => {
        fetch(`https://icebox-server.vercel.app/addProducts/available/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }   
            
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Make available.')
                    refetch()
                    navigate('/Available')
                }
        })
    }



    //for delete

    const handleDeleteProduct = product => {
        console.log(product);
        fetch(`https://icebox-server.vercel.app/addProducts/${product._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`product ${product.name} deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }



    return (
        <div className='px-10'>
            <h3 className="text-2xl mb-5 ">My Products</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>name</th>
                            <th>Price</th>
                            <th>Status</th>
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
                                    {
                                        addProduct?.role !=='available' && <button onClick={() => handleMakeAvailable(addProduct._id)} className='btn btn-primary btn-sm'>Make Advertise</button>
                                    }
                                    
                                   
                                </td>
                                <td>
                                    <label onClick={() => setDeletingProduct(addProduct)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingProduct.name}. It cannot be undone.`}
                    successAction={handleDeleteProduct}
                    successButtonName="Delete"
                    modalData={deletingProduct}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
             
        </div>
    );
};

export default MyProducts;