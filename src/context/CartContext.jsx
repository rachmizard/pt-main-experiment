import React, { createContext, useState } from "react";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
     const convertJson = JSON.parse(localStorage.getItem("__cart__"));

     const [carts, setCarts] = useState(convertJson || []);

     const value = { carts, setCarts };

     return (
          <CartContext.Provider value={value}>{children}</CartContext.Provider>
     );
};

export default CartProvider;
