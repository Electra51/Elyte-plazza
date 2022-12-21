import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useBuyer from '../hooks/useBuyer';
import useSeller from '../hooks/useSeller';
import Navbar from '../Pages/Shared/Navbar';


const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);

  
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content bg-gray-200">
                    <li><button className='btn btn-warning'><Link to="/dashboard/MyOrders" className='text-black'>My Orders</Link></button></li>
                       
                            
                                
                               
                        
                        
                       
                        {
                            isAdmin && <>
                                
                                <li><button className='btn btn-warning mt-2 text-black'><Link to="/dashboard/allBuyers">All Buyers</Link></button></li>
                                <li><button className='btn btn-warning my-2 text-black'><Link to="/dashboard/allSellers">All Sellers</Link></button></li>
                                <li><button  className='btn btn-warning text-black'><Link to="/dashboard/reportItem">Reported Item</Link></button></li>
                                
                               
                             </>
                        }
                        
                            {
                                isSeller && <>
                                <li><button className='btn btn-warning my-2 text-black'><Link to="/dashboard/myProducts">My Products</Link></button></li>
                                <li><button className='btn btn-warning text-black'><Link to="/dashboard/addAProduct">Add A Product</Link></button></li>
                                   
                                 </>
                            }
                        

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;