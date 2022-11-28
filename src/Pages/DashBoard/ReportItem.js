

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Shared/ConfirmationModal';
import Loading from '../Shared/Loading';

const ReportItem = () => {
    const [deletingReportedItem, setDeletingReportedItem] = useState([null]);
    const navigate = useNavigate();

    const closeModal = () => {
        setDeletingReportedItem(null);
    }


    const { data: reportedItems, isLoading, refetch } = useQuery({
        queryKey: ['reportedItems'],
        queryFn: async () => {
            try {
                const res = await fetch('https://icebox-server.vercel.app/products/report/report'
                    ,
                    {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                    }
                );
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    const handleDeleteReportedItem = reportedItem => {
        console.log(reportedItem);
        fetch(`https://icebox-server.vercel.app/products/${reportedItem._id}`, {
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
                    toast.success(`${reportedItem.name} deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }


    return (
        <div className='px-10'>
           <h3 className="text-2xl mb-5 ">Reported Item here</h3>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            
                            <th>name</th>
                            <th>Price</th>
                            
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedItems?.map((reportedItem, i) =>
                            <tr key={reportedItem._id}>
        <th>{1+i}</th>
        <td>{reportedItem.name}</td>
        <td>{reportedItem.resale_price}</td>
        <td>
                                    <label onClick={() => setDeletingReportedItem(reportedItem)} htmlFor="confirmation-modal" className="btn btn-sm btn-error">Delete</label>
                                </td>
      </tr>)

                        }
     
      
      
      
    </tbody>
                  
                </table>
            </div>
            {
                deletingReportedItem && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingReportedItem.name}. It cannot be undone.`}
                    successAction={handleDeleteReportedItem}
                    successButtonName="Delete"
                    modalData={deletingReportedItem}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }

        </div>
    );
};

export default ReportItem;