import React from 'react';

const BookingModal = ({ productModals }) => {
    const {item_name, original_price, resale_price  } = productModals;
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{item_name}</h3>
                    <p className=' text-primary'>Price: ${resale_price}</p>
                    <form className='grid grid-cols-1 gap-3 mt-10'>
                    <input name="name" type="text" disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <input name="email" type="email" disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered" />
                        <input name="location" type="text" placeholder="Location" className="input w-full input-bordered" />
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                   </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;