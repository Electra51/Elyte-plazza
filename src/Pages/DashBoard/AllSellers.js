

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Shared/ConfirmationModal';
import Loading from '../Shared/Loading';

const AllSellers = () => {
    const [deletingSeller, setDeletingSeller] = useState([null]);
    const navigate = useNavigate();

    const closeModal = () => {
        setDeletingSeller(null);
    }


    const { data: sellers, isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            try {
                const res = await fetch('https://icebox-server.vercel.app/users/seller'
                    // ,
                    // {
                    // headers: {
                    //     authorization: `bearer ${localStorage.getItem('accessToken')}`
                    // }
                    // }
                );
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    //handleMakeAvailable
    const handleMakeVerified = id => {
        fetch(`https://icebox-server.vercel.app/users/verify/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }   
            
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Make verified.')
                    refetch()
                    // navigate('/Available')
                }
        })
    }


    const handleDeleteSeller = seller => {
        console.log(seller);
        fetch(`https://icebox-server.vercel.app/users/${seller._id}`, {
            method: 'DELETE'
            // ,
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Buyer ${seller.name} deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='px-10'>
           <h3 className="text-2xl mb-5 ">All Seller</h3>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            
                            <th>name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellers?.map((seller, i) =>
                            <tr key={seller._id}>
        <th>{1+i}</th>
        <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    <td>
                                   
                                    {
                                          seller?.type !=='verified' && <button onClick={() => handleMakeVerified(seller._id)} className='btn btn-primary btn-sm'>Verify</button>
                                        }
                                        {
                                          seller?.type ==='verified' && <button className='btn btn-outline btn-sm'>Verified</button>
                                    }
                                    </td>
        <td>
                                    <label onClick={() => setDeletingSeller(seller)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
      </tr>)

                        }
     
      
      
      
    </tbody>
                  
                </table>
            </div>
            {
                deletingSeller && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingSeller.name}. It cannot be undone.`}
                    successAction={handleDeleteSeller}
                    successButtonName="Delete"
                    modalData={deletingSeller}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }

        </div>
    );
};

export default AllSellers;