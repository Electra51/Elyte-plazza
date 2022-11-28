import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const Available = () => {

    const { data: availables, isLoading, refetch } = useQuery({
        queryKey: ['availables'],
        queryFn: async () => {
            try {
                const res = await fetch('https://icebox-server.vercel.app/addProducts/available'
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

    const notify = e => {
        toast('Coming soon.......')
    }
    

    return (
        <div>
              <div className='text-center mt-20'>
                <p className="text-2xl font-bold">Available Products</p>
                <p className='mb-10'>Available Products here that you can select one easily</p>

                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 my-20'>
                    {
                        availables?.map(available =>
                            <div className="card w-96 bg-base-100 shadow-xl" key={available._id}>
                            <figure className="px-10 pt-10">
                              <img src={available.image} alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                              <h2 className="card-title">{available.name}</h2>
                                    <p>Price :{available.price}</p>
                                    <p>Year of use: {available.year}</p>
                              <div className="card-actions">
                                        {
                                            
                              
                                                <button onClick={notify} className="btn btn-primary">Buy Now</button>
}                              </div>
                            </div>
                          </div>)
                    }
 </div>

            </div>
        </div>
    );
};

export default Available;