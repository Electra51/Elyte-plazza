import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, useNavigation } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../Shared/Loading';


const MyOrders = () => {
    const navigation = useNavigation();
    
 
    const { user } = useContext(AuthContext);

    // const url = `https://icebox-server.vercel.app/bookings?email=${user?.email}`;
    

    const { data: bookings = [] ,isLoading, refetch} = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`https://icebox-server.vercel.app/bookings?email=${user?.email}`, {
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
        // queryFn: async () => {
        //     const res = await fetch(url, {
        //         headers: {
        //             authorization: `bearer ${localStorage.getItem('accessToken')}`
        //         }
        //     });
        //     const data = await res.json();
        //     return data;
        // }
    })
    refetch()
    if (isLoading) {
        return <Loading></Loading>
    }

    if (navigation.state === "loading") {
        return <Loading></Loading>
    }
    
   

    return (
   
        <div className='px-10'>
            <h3 className="text-2xl mb-5">My Orders</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Pay</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                  
                        {
                            bookings?.length &&
                            bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>
                                <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={booking.imageUrl} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
                                </td>
                                <td>{booking.itemName}</td>
                                <td>{booking.price}</td>
                               
                                <td>
                                    {
                                        booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}>
                                        <button className='btn btn-primary btn-sm'>Pay</button></Link>

                                    }
                                    {
                                         booking.price && booking.paid && <span className='text-green-500'>Paid</span>
                                    }
                                   
                                  
                                   
                                </td>
                            </tr>)
                                    }
                                    
                    </tbody>
                </table>
            </div>
        </div>
    
        
    );
};

export default MyOrders;