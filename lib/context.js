import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //Increase product quantity
  const handleAddQty = () => {
    setQty((prev) => prev + 1);
  };

  //Decrease product quantity
  const handleSubtractQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) {
        return 1;
      }
      return prev - 1;
    });
  };

  //Add Product to Cart
  const handleCartAdd = (product, quantity) => {
    //Increase total Quantity
    setTotalQuantities((prev) => prev + quantity);

    //Increase total Price
    setTotalPrice((prev) => prev + quantity * product.Price);

    //Check if product exists
    const existingItem = cartItems.find((item) => item.Slug === product.Slug);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.Slug === product.Slug
            ? { ...existingItem, quantity: existingItem.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  //Remove Product from Cart
  const handleCartRemove = (product) => {
    //Deccrease total Quantity
    setTotalQuantities((prev) => prev - 1);

    //Decrease total Price
    setTotalPrice((prev) => prev - product.Price);

    //Check if product exists
    const existingItem = cartItems.find((item) => item.Slug === product.Slug);

    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.Slug !== product.Slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.Slug === product.Slug
            ? { ...existingItem, quantity: existingItem.quantity - 1 }
            : item
        )
      );
    }
  };

  //Adding data for state
  return (
    <ShopContext.Provider
      value={{
        qty,
        handleAddQty,
        handleSubtractQty,
        showCart,
        setShowCart,
        handleCartAdd,
        handleCartRemove,
        cartItems,
        totalQuantities,
        totalPrice,
        setQty,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
