import React from "react";
import { useEffect, useState } from "react";
import WishContext from "./WishContext";

const WishlistProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("wish")
        ? JSON.parse(localStorage.getItem("wish"))
        : []
    );
  };

  const addItemToCart = async ({
    product,
    item_name,
    role,
    resale_price,
    item_img,
    type,
    original_price,
    seller_name,
    year_of_use,
    quantity = 1,
  }) => {
    const item = {
      product,
      role,
      type,
      item_name,
      resale_price,
      item_img,
      original_price,
      seller_name,
      year_of_use,
    };

    const isItemExist = cart?.cartItems?.find(
      (i) => i.product === item.product
    );

    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.product === isItemExist.product ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("wish", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  return (
    <WishContext.Provider
      value={{
        cart,
        setCartToState,
        addItemToCart,
      }}
    >
      {children}
    </WishContext.Provider>
  );
};

export default WishlistProvider;
