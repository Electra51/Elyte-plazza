import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import DotLoader from "react-spinners/DotLoader";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useBuyer from '../../hooks/useBuyer';
import useAdmin from '../../hooks/useAdmin';

const SingleProduct = ({ oneProduct, setProductModals }) => {
    const{user}=useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email);
    const navigate = useNavigate();
    const { loading } = useContext(AuthContext);
    const { item_img, item_name, location, original_price, resale_price, seller_name, year_of_use } = oneProduct;
    if(loading){
        return  <DotLoader
        color={'#E9C211'}
        loading={loading}
        
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    }

    const handleMakeReport = id => {
        fetch(`https://icebox-server.vercel.app/products/report/${id}`, {
            method: 'PUT'
            ,
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }   
            
        }
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('Reported this item')
                    // refetch()
                    navigate('/dashboard/reportItem')
                }
        })
    }
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={item_img} alt="fridge" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{item_name}</h2>
                    <p className=''>original_price: {original_price}</p>
                    <p className=''>resale_price: {resale_price}</p>
                    <p className=''>seller_name: {seller_name}</p>
                    <p className=''>location: {location}</p>
                    <p className=''>year_of_use: {year_of_use}</p>
                    <div className='flex justify-between items-center'>
                    <div className="">
                        <label onClick={()=>setProductModals(oneProduct)}
                            htmlFor="booking-modal" className="btn btn-primary">Book Now</label>
                        
                        </div>
                        {
                                        oneProduct?.type !=='report' && <Link onClick={() => handleMakeReport(oneProduct._id)} className='underline ml-5 text-primary'>Report to Admin</Link>
                        }
                        {
                               
                                oneProduct?.type ==='report' && <Link className='underline text-red-700 font-bold ml-5'>Reported</Link>
                         
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;