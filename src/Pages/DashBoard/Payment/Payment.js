import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
// import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const booking = useLoaderData();
    // const navigation = useNavigation();

    // if(navigation.state === "loading"){
    //     return <Loading></Loading>
    // }
    return (
        <div className='mt-[90px] px-10'>
            <h3 className="text-2xl">Payment for <span className='text-[#166cda] font-bold'> {booking.itemName}</span> </h3>
            <hr />
            <p className='text-xl mt-4'><strong>Product Name:</strong> {booking.itemName}</p>
            <p className='text-xl '><strong>Product Price:</strong> {booking.price}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;