import React, { useContext, useState } from 'react'
import WishContext from '../../contexts/WishContext';
import { FcBusinessman } from 'react-icons/fc';
import BookingModal from '../BookingModal/BookingModal';
import { FaRegHeart } from 'react-icons/fa';

const WishList = () => {
    const { cart, addItemToCart, deleteItemFromCart } = useContext(WishContext);
    const [productModals, setProductModals] = useState(null);
    console.log("cart", cart.cartItems)
    return (
        <div>
            <p className='font-semibold text-xl py-5  max-w-6xl mx-auto'>My WishList</p>
            <div className='grid grid-cols-4 max-w-6xl mx-auto gap-7 pb-12 pt-6'>
                {
                    cart.cartItems?.map((e, i) => {
                        return (
                            <div
                                className="h-[390px] bg-gray-200 shadow-xl relative rounded-[4px]"
                                key={i}
                            >
                                <figure className="p-3 pt-10 h-40">
                                    <img
                                        src={e.item_img}
                                        alt="Shoes"
                                        className="rounded-xl h-full w-full object-contain"
                                    />
                                </figure>
                                <div className="pt-6 h-40 px-5 items-center text-center text-black">
                                    <h2 className="text-[16px] font-bold text-start">{e.item_name}</h2>
                                    <p className="text-[15px] line-through text-start">
                                        Original Price:{" "}
                                        <span className="line-through">${e.original_price}</span>
                                    </p>
                                    <p className="text-[15px] text-start">
                                        Resale Price: <span className="">${e.resale_price}</span>
                                    </p>
                                    <div className="flex justify-between item-center text-[15px] mt-1">
                                        <div className="flex justify-center items-center gap-1">
                                            <FcBusinessman />
                                            {e.seller_name}
                                        </div>
                                        <p>Use: {e.year_of_use} year</p>
                                    </div>


                                    <div className="py-6">
                                        <label
                                            onClick={() => setProductModals(e)}
                                            htmlFor="booking-modal"
                                            className="text-white px-16 py-2 text-[14px] rounded-md bg-[#156CDA] w-full"
                                        >
                                            Book Now
                                        </label>
                                        <p className='text-[12px] py-2 underline hover:text-blue-500 cursor-pointer' onClick={() => deleteItemFromCart(e)}>Remove From Wishlist</p>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {productModals && (
                <BookingModal
                    productModals={productModals}
                    setProductModals={setProductModals}
                ></BookingModal>
            )}
        </div>
    )
}

export default WishList