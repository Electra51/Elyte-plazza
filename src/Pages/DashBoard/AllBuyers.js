

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Shared/ConfirmationModal';
import Loading from '../Shared/Loading';

const AllBuyers = () => {
    const [deletingBuyer, setDeletingBuyer] = useState([null]);
    const navigate = useNavigate();

    const closeModal = () => {
        setDeletingBuyer(null);
    }


    const { data: buyers, isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/users/buyer'
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

    const handleDeleteBuyer = buyer => {
        console.log(buyer);
        fetch(`http://localhost:5000/users/${buyer._id}`, {
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
                    toast.success(`Buyer ${buyer.name} deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div>
            All buyers

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            
                            <th>name</th>
                            <th>Email</th>
                            
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers?.map((buyer, i) =>
                            <tr key={buyer._id}>
        <th>{1+i}</th>
        <td>{buyer.name}</td>
        <td>{buyer.email}</td>
        <td>
                                    <label onClick={() => setDeletingBuyer(buyer)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
      </tr>)

                        }
     
      
      
      
    </tbody>
                  
                </table>
            </div>
            {
                deletingBuyer && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingBuyer.name}. It cannot be undone.`}
                    successAction={handleDeleteBuyer}
                    successButtonName="Delete"
                    modalData={deletingBuyer}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }

        </div>
    );
};

export default AllBuyers;